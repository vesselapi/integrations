import { isFunction, isString, unique } from 'radash';
import { z } from 'zod';
import {
  ApiKeyAuthConfig,
  AuthQuestion,
  BasicAuthConfig,
  HttpsUrl,
  OAuth2AuthConfig,
  RetryableCheckFunction,
} from './types';

export const toQueryString = (query: Record<string, string>): string => {
  return Object.entries(query)
    .map(([key, value]) => [key, encodeURIComponent(value)])
    .map((x) => x.join('='))
    .join('&');
};

export const auth = {
  oauth2: <
    TAnswers extends Record<string, string> = Record<string, string>,
    TOAuthAppConfigSchema extends z.ZodType = z.ZodType<
      Record<string, unknown>
    >,
    TOAuthCallbackArgsSchema extends z.ZodType = z.ZodType<
      Record<string, unknown>
    >,
  >(options: {
    authUrl:
      | HttpsUrl
      | OAuth2AuthConfig<TAnswers, z.infer<TOAuthAppConfigSchema>>['authUrl'];
    tokenUrl:
      | HttpsUrl
      | OAuth2AuthConfig<
          TAnswers,
          z.infer<TOAuthAppConfigSchema>,
          z.infer<TOAuthCallbackArgsSchema>
        >['tokenUrl'];
    questions?: AuthQuestion[];
    default?: boolean;
    scopeSeparator?: OAuth2AuthConfig<TAnswers>['scopeSeparator'];
    tokenAuth?: OAuth2AuthConfig<TAnswers>['tokenAuth'];
    oauthBodyFormat?: OAuth2AuthConfig<TAnswers>['oauthBodyFormat'];
    authParams?: OAuth2AuthConfig<TAnswers>['authParams'];
    requiredScopes?: OAuth2AuthConfig<TAnswers>['requiredScopes'];
    url?: OAuth2AuthConfig<TAnswers>['url'];
    isRetryable?: RetryableCheckFunction;
    display?: OAuth2AuthConfig<TAnswers>['display'];
    appMetadataSchema?: TOAuthAppConfigSchema;
    callbackArgsSchema?: TOAuthCallbackArgsSchema;
    refreshTokenExpiresAt?: () => Date | null;
    accessTokenExpiresAt?: () => Date | null;
  }): OAuth2AuthConfig<
    TAnswers,
    z.infer<TOAuthAppConfigSchema>,
    z.infer<TOAuthCallbackArgsSchema>
  > => ({
    type: 'oauth2',
    authUrl: isString(options.authUrl)
      ? () => options.authUrl as HttpsUrl
      : options.authUrl,
    tokenUrl: isString(options.tokenUrl)
      ? () => options.tokenUrl as HttpsUrl
      : options.tokenUrl,
    tokenAuth: options.tokenAuth ?? 'body',
    default: options.default ?? false,
    scopeSeparator: options.scopeSeparator ?? ' ',
    requiredScopes: options.requiredScopes ?? [],
    questions: options.questions ?? [],
    oauthBodyFormat: options.oauthBodyFormat ?? 'form',
    authParams: options.authParams ?? {},
    display: options.display ?? {
      markdown: (
        platform,
      ) => `- You're about to be directed to an external page where you will sign into your ${platform.display.name} account.
- Once signed in, you'll be redirected back and your credentials will be securely stored by Vessel.`,
    },
    url:
      options.url ??
      (({ scopes, clientId, redirectUrl, state, answers, appMetadata }) => {
        const query: Record<string, string> = {
          client_id: clientId,
          redirect_uri: redirectUrl,
          scope: unique([...scopes, ...(options.requiredScopes ?? [])]).join(
            options.scopeSeparator ?? ' ',
          ),
          state,
          response_type: 'code',
          ...(options.authParams ?? {}),
        };
        return `${
          isFunction(options.authUrl)
            ? options.authUrl({ answers, appMetadata })
            : options.authUrl
        }?${toQueryString(query)}`;
      }),
    isRetryable: options.isRetryable ?? (async ({ status }) => status === 401),
    appMetadataSchema: options.appMetadataSchema ?? z.any(),
    callbackArgsSchema: options.callbackArgsSchema ?? z.any(),
    refreshTokenExpiresAt: options.refreshTokenExpiresAt ?? (() => null),
    accessTokenExpiresAt: options.accessTokenExpiresAt ?? (() => null),
  }),
  apiToken: <TAnswers extends Record<string, string> = Record<string, string>>(
    options: {
      questions?: AuthQuestion[];
      default?: boolean;
      display?: OAuth2AuthConfig['display'];
    } = {},
  ): ApiKeyAuthConfig<TAnswers> => ({
    type: 'apiKey',
    default: options.default ?? false,
    questions: [
      {
        type: 'text',
        id: 'api-key',
        label: 'API key',
      },
      ...(options.questions ?? []),
    ],
    toTokenString: (answers) => answers['api-key'],
    display: options.display ?? {
      markdown: (
        platform,
      ) => `- You will find an API Key under Settings in your ${platform.display.name} account.
- Copy and paste the API Key above.`,
    },
  }),
  basic: <TAnswers extends Record<string, string> = Record<string, string>>(
    options: {
      questions?:
        | [{ type: 'text'; id: 'username'; label: string }, ...AuthQuestion[]]
        | [{ type: 'text'; id: 'password'; label: string }, ...AuthQuestion[]]
        | [
            { type: 'text'; id: 'username'; label: string },
            { type: 'text'; id: 'password'; label: string },
            ...AuthQuestion[],
          ];
      default?: boolean;
      display?: OAuth2AuthConfig['display'];
    } = {},
  ): BasicAuthConfig<TAnswers> => ({
    type: 'basic',
    default: options.default ?? false,
    questions: options.questions ?? [],
    toTokenString: (answers) =>
      Buffer.from(
        `${answers.username ?? ''}:${answers.password ?? ''}`,
      ).toString('base64'),
    display: options.display ?? {
      markdown: () => ``,
    },
  }),
};
