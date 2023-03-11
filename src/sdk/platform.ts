import { mapValues } from 'radash';
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
      infer TInput,
      infer TOutput
    >
      ? Action<TInput, TOutput>
      : never;
  },
> = {
  auth: StandardAuthConfig | OAuth2AuthConfig;
  actions: TActions;
  display: PlatformDisplayConfig;
  request?: (options: HTTPOptions) => Promise<any>;
};

export const platform = <
  TActions extends {
    [Key in keyof TActions]: TActions[Key] extends Action<
      infer TInput,
      infer TOutput
    >
      ? Action<TInput, TOutput>
      : never;
  },
>(
  id: string,
  options: PlatformOptions<TActions>,
): Platform<TActions> => {
  const wrapAction =
    <
      TInput extends {},
      TOutput extends {},
      TAction extends Action<TInput, TOutput>,
    >(
      action: TAction,
    ): DirectlyInvokedAction<TInput, TOutput> =>
    async (input) => {
      return await action.func({
        input,
        auth: {
          getAccessToken: async () => '',
          getConnectionSecrets: async () => {
            return {};
          },
        },
      });
    };

  return {
    id,
    request: options.request,
    support: {
      passthrough: !!options.request,
    },
    auth: options.auth,
    display: options.display,
    rawActions: Object.values(options.actions),
    actions: mapValues(
      options.actions as Record<string, Action<{}, {}>>,
      wrapAction,
    ) as {
      [Key in keyof TActions]: TActions[Key] extends Action<
        infer TInput,
        infer TOutput
      >
        ? DirectlyInvokedAction<TInput, TOutput>
        : never;
    },
  };
};
