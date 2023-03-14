import {
  AuthQuestion,
  HttpsUrl,
  OAuth2AuthConfig,
  StandardAuthConfig,
} from './types';

export const auth = {
  oauth2: (options: {
    authUrl: HttpsUrl;
    tokenUrl: HttpsUrl;
    default?: boolean;
    scopeSeparator?: OAuth2AuthConfig['scopeSeparator'];
    tokenAuth?: OAuth2AuthConfig['tokenAuth'];
    questions?: AuthQuestion[];
  }): OAuth2AuthConfig => ({
    type: 'oauth2',
    authUrl: options.authUrl,
    tokenUrl: options.tokenUrl,
    tokenAuth: options.tokenAuth ?? 'body',
    default: options.default ?? false,
    scopeSeparator: options.scopeSeparator ?? ' ',
    questions: options.questions ?? [],
    url: ({ scopes, clientId, redirectUrl, state }) => {
      const query = [
        ['client_id', clientId],
        ['redirect_uri', redirectUrl],
        ['scope', scopes.join('+')],
        ['state', JSON.stringify(state)],
      ]
        .map((x) => x.join('='))
        .join('&');
      return `${options.authUrl}?${query}`;
    },
  }),
  apiToken: (options: {
    questions?: AuthQuestion[];
    default?: boolean;
  }): StandardAuthConfig => ({
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
  }),
};
