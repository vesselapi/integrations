import {
  AuthQuestion,
  HttpsUrl,
  OAuth2AuthConfig,
  StandardAuthConfig,
} from './types';

export const auth = {
  oauth2: ({
    authUrl,
    tokenUrl,
    questions = [],
  }: {
    authUrl: HttpsUrl;
    tokenUrl: HttpsUrl;
    questions?: AuthQuestion[];
  }): OAuth2AuthConfig => ({
    type: 'oauth2',
    authUrl,
    tokenUrl,
    questions,
    url: ({ scopes, clientId, redirectUrl, state }) => {
      const query = [
        ['client_id', clientId],
        ['redirect_uri', redirectUrl],
        ['scope', scopes.join('+')],
        ['state', JSON.stringify(state)],
      ]
        .map((x) => x.join('='))
        .join('&');
      return `${authUrl}?${query}`;
    },
    apply: (options, { accessToken }) => ({
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  }),
  apiToken: ({
    questions = [],
  }: {
    questions?: AuthQuestion[];
  }): StandardAuthConfig => ({
    type: 'standard',
    questions: [
      {
        type: 'string',
        id: 'api-key',
        label: 'API key',
      },
      ...questions,
    ],
    apply: (options, { answers }) => ({
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Key ${answers['api-key']}`,
      },
    }),
  }),
};
