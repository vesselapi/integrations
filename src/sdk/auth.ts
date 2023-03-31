import { isFunction, isString } from 'radash';
import {
  AuthQuestion,
  HttpsUrl,
  OAuth2AuthConfig,
  RetryableCheckFunction,
  StandardAuthConfig,
} from './types';

const toQueryString = (query: Record<string, string>): string => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    params.set(key, value);
  }
  return params.toString();
};

export const auth = {
  oauth2: (options: {
    authUrl: HttpsUrl | OAuth2AuthConfig['authUrl'];
    tokenUrl: HttpsUrl | OAuth2AuthConfig['tokenUrl'];
    questions?: AuthQuestion[];
    default?: boolean;
    scopeSeparator?: OAuth2AuthConfig['scopeSeparator'];
    tokenAuth?: OAuth2AuthConfig['tokenAuth'];
    oauthBodyFormat?: OAuth2AuthConfig['oauthBodyFormat'];
    url?: OAuth2AuthConfig['url'];
    isRetryable?: RetryableCheckFunction;
    display?: OAuth2AuthConfig['display'];
  }): OAuth2AuthConfig => ({
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
    questions: options.questions ?? [],
    oauthBodyFormat: options.oauthBodyFormat ?? 'form',
    display: options.display ?? {
      markdown: (
        platform,
      ) => `- You're about to be directed to an external page where you will sign into your ${platform.display.name} account.
- Once signed in, you'll be redirected back and your credentials will be securely stored by Vessel.`,
    },
    url:
      options.url ??
      (({ scopes, clientId, redirectUrl, state, answers }) => {
        const query: Record<string, string> = {
          client_id: clientId,
          redirect_uri: redirectUrl,
          scope: scopes.join(options.scopeSeparator ?? '+'),
          state,
          response_type: 'code',
        };
        return `${
          isFunction(options.authUrl)
            ? options.authUrl({ answers })
            : options.authUrl
        }?${toQueryString(query)}`;
      }),
    isRetryable:
      options.isRetryable ?? (({ response }) => response.status === 401),
  }),
  apiToken: (
    options: {
      questions?: AuthQuestion[];
      default?: boolean;
      display?: OAuth2AuthConfig['display'];
    } = {},
  ): StandardAuthConfig => ({
    type: 'standard',
    default: options.default ?? false,
    questions: [
      {
        type: 'string',
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
};
