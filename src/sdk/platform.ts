import { isArray, unique } from 'radash';
import {
  Action,
  ApiKeyAuthConfig,
  BasicAuthConfig,
  OAuth2AuthConfig,
  Platform,
  PlatformClient,
  PlatformConstants,
  PlatformDisplayConfig,
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
  TBasicAnswers extends Record<string, string>,
  TApiKeyAnswers extends Record<string, string>,
  TOAuth2Answers extends Record<string, string>,
  TOAuth2AppMeta extends Record<string, unknown>,
  TConstants extends PlatformConstants,
> = {
  auth:
    | BasicAuthConfig<TBasicAnswers>
    | ApiKeyAuthConfig<TApiKeyAnswers>
    | OAuth2AuthConfig<TOAuth2Answers, TOAuth2AppMeta>
    | (
        | BasicAuthConfig<TBasicAnswers>
        | ApiKeyAuthConfig<TApiKeyAnswers>
        | OAuth2AuthConfig<TOAuth2Answers, TOAuth2AppMeta>
      )[];
  constants: TConstants;
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
  TBasicAnswers extends Record<string, string>,
  TApiKeyAnswers extends Record<string, string>,
  TOAuth2Answers extends Record<string, string>,
  TOAuth2AppMeta extends Record<string, unknown>,
  TConstants extends PlatformConstants,
>(
  id: TId,
  options: PlatformOptions<
    TActions,
    TClient,
    TBasicAnswers,
    TApiKeyAnswers,
    TOAuth2Answers,
    TOAuth2AppMeta,
    TConstants
  >,
): Platform<
  TActions,
  TClient,
  string,
  TBasicAnswers,
  TApiKeyAnswers,
  TOAuth2Answers,
  TOAuth2AppMeta,
  TConstants
> => {
  const authConfigs = isArray(options.auth)
    ? options.auth.length === 1
      ? options.auth.map((x) => ({ ...x, default: true }))
      : options.auth
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
      `One and only one auth must be the default when using multiple auth types but ${id} has ${
        defaultAuthConfigs.length
      } auths (${defaultAuthConfigs.map((x) => x.type).join(', ')})`,
    );
  }

  return {
    id,
    client: options.client,
    auth: authConfigs,
    display: options.display,
    rawActions: Object.values(options.actions),
    constants: options.constants,
    actions: options.actions,
  };
};
