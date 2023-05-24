import { isArray, unique } from 'radash';
import {
  Action,
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
      string,
      infer TInput,
      infer TOutput
    >
      ? Action<string, string, TInput, TOutput>
      : never;
  },
  TClient extends PlatformClient,
  TAnswers extends Record<string, string>,
  TOAuth2Answers extends Record<string, string>,
  TOAuth2AppMeta extends Record<string, unknown>,
  TConstants extends PlatformConstants,
> = {
  auth:
    | StandardAuthConfig<TAnswers>
    | OAuth2AuthConfig<TOAuth2Answers, TOAuth2AppMeta>
    | (
        | StandardAuthConfig<TAnswers>
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
      string,
      infer TInput,
      infer TOutput
    >
      ? Action<string, string, TInput, TOutput>
      : never;
  },
  TClient extends PlatformClient,
  TId extends string,
  TStandardAnswers extends Record<string, string>,
  TOAuth2Answers extends Record<string, string>,
  TOAuth2AppMeta extends Record<string, unknown>,
  TConstants extends PlatformConstants,
>(
  id: TId,
  options: PlatformOptions<
    TActions,
    TClient,
    TStandardAnswers,
    TOAuth2Answers,
    TOAuth2AppMeta,
    TConstants
  >,
): Platform<
  TActions,
  TClient,
  string,
  TStandardAnswers,
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
