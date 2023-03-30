import { isArray, mapValues, unique } from 'radash';
import {
  Action,
  DirectlyInvokedAction,
  OAuth2AuthConfig,
  Platform,
  PlatformClient,
  PlatformConstants,
  PlatformDisplayConfig,
  StandardAuthConfig,
} from './types';

export type PlatformOptions<
  TActions extends {
    [Key in keyof TActions]: TActions[Key] extends Action<
      string,
      infer TInput,
      infer TOutput
    >
      ? Action<string, TInput, TOutput>
      : never;
  },
  TClient extends PlatformClient,
> = {
  auth:
    | StandardAuthConfig
    | OAuth2AuthConfig
    | (StandardAuthConfig | OAuth2AuthConfig)[];
  constants: PlatformConstants;
  actions: TActions;
  display: PlatformDisplayConfig;
  client: TClient;
};

export const platform = <
  TActions extends {
    [Key in keyof TActions]: TActions[Key] extends Action<
      string,
      infer TInput,
      infer TOutput
    >
      ? Action<string, TInput, TOutput>
      : never;
  },
  TClient extends PlatformClient,
  TId extends string,
>(
  id: TId,
  options: PlatformOptions<TActions, TClient>,
): Platform<TActions, TClient, string> => {
  const authConfigs = isArray(options.auth)
    ? options.auth
    : [
        {
          ...options.auth,
          default: true,
        },
      ];
  const authTypes = authConfigs.map((a) => a.type);
  if (unique(authTypes).length !== authConfigs.length) {
    throw new Error(
      'Multiple auth strategies of the same type were provided: ' +
        authTypes.join(', '),
    );
  }
  const defaultAuthConfigs = authConfigs.filter((a) => a.default === true);
  if (defaultAuthConfigs.length !== 1) {
    throw new Error(
      'One and only one auth must be the default when using multiple auth types',
    );
  }
  const wrapAction =
    <
      TInput extends {},
      TOutput extends {},
      TAction extends Action<string, TInput, TOutput>,
    >(
      action: TAction,
    ): DirectlyInvokedAction<TInput, TOutput> =>
    async (input, auth) => {
      return await action.func({
        input,
        auth,
      });
    };

  return {
    id,
    client: options.client,
    auth: authConfigs,
    display: options.display,
    rawActions: Object.values(options.actions),
    constants: options.constants,
    actions: mapValues(
      options.actions as Record<string, Action<string, {}, {}>>,
      wrapAction,
    ) as {
      [Key in keyof TActions]: TActions[Key] extends Action<
        string,
        infer TInput,
        infer TOutput
      >
        ? DirectlyInvokedAction<TInput, TOutput>
        : never;
    },
  };
};
