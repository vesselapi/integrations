import { isFunction } from 'radash';
import {
  AuthQuestion,
  OAuth2AuthConfig,
  RetryableCheckFunction,
  StandardAuthConfig,
} from './types';

export const auth = {
  oauth2: (options: {
    authUrl: OAuth2AuthConfig['authUrl'];
    tokenUrl: OAuth2AuthConfig['tokenUrl'];
    default?: boolean;
    scopeSeparator?: OAuth2AuthConfig['scopeSeparator'];
    tokenAuth?: OAuth2AuthConfig['tokenAuth'];
    questions?: AuthQuestion[];
    oauthBodyFormat?: OAuth2AuthConfig['oauthBodyFormat'];
    url?: OAuth2AuthConfig['url'];
    isRetryable?: RetryableCheckFunction;
    display?: OAuth2AuthConfig['display'];
  }): OAuth2AuthConfig => ({
    type: 'oauth2',
    authUrl: options.authUrl,
    tokenUrl: options.tokenUrl,
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
        const query = [
          ['client_id', encodeURIComponent(clientId)],
          ['redirect_uri', encodeURIComponent(redirectUrl)],
          ['scope', scopes.join(options.scopeSeparator ?? '+')],
          ['state', encodeURIComponent(state)],
          ['response_type', 'code'],
        ]
          .map((x) => x.join('='))
          .join('&');
        return `${
          isFunction(options.authUrl)
            ? options.authUrl({ answers })
            : options.authUrl
        }?${query}`;
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
