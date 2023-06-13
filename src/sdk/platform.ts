import dur, { Duration } from 'durhuman';
import { isArray, isString, unique } from 'radash';
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
      infer TInput,
      infer TOutput
    >
      ? Action<string, TInput, TOutput>
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
  unification: {
    resources:
      | (
          | string
          | {
              object: string;
              frequency: {
                min?: Duration;
                max?: Duration;
              };
            }
        )[]
      | Record<
          string,
          (
            | string
            | {
                object: string;
                frequency: {
                  min?: Duration;
                  max?: Duration;
                };
              }
          )[]
        >;
  };
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
    unification: {
      verify: ({ vertical, objects }) => {
        const resources = isArray(options.unification.resources)
          ? options.unification.resources
          : options.unification.resources[vertical];
        if (!resources) {
          throw new Error(
            `The ${id} platform does not support the ${vertical} vertical`,
          );
        }
        for (const { name, frequency } of objects) {
          const match = resources.find((r) =>
            isString(r) ? r === name : r.object === name,
          );
          if (!match) {
            throw new Error(
              `The ${id} platform does not support ${name} as a unified object`,
            );
          }
          if (isString(match)) {
            return true;
          }
          if (
            match.frequency.max &&
            dur(match.frequency.max) < dur(frequency)
          ) {
            throw new Error(
              `The ${id} platform does not support syncing ${name} more often than every ${match.frequency.max}`,
            );
          }
          if (
            match.frequency.min &&
            dur(match.frequency.min) > dur(frequency)
          ) {
            throw new Error(
              `The ${id} platform does not support syncing ${name} less often than every ${match.frequency.min}`,
            );
          }
        }
        return true;
      },
    },
  };
};
