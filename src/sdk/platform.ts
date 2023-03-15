import { isArray, mapValues, unique } from 'radash';
import {
  Action,
  DirectlyInvokedAction,
  HTTPOptions,
  OAuth2AuthConfig,
  Platform,
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
> = {
  auth:
    | StandardAuthConfig
    | OAuth2AuthConfig
    | (StandardAuthConfig | OAuth2AuthConfig)[];
  actions: TActions;
  display: PlatformDisplayConfig;
  request?: (options: HTTPOptions) => Promise<any>;
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
>(
  id: string,
  options: PlatformOptions<TActions>,
): Platform<TActions> => {
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
        // TODO: figure out how to generate the auth here (or delete this if we can't)
        auth: auth ?? {
          getAccessToken: async () => {
            return 'foo';
          },
          getConnectionSecrets: async () => {
            return {};
          },
        },
      });
    };

  return {
    id,
    auth: authConfigs,
    display: options.display,
    request: options.request,
    rawActions: Object.values(options.actions),
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
