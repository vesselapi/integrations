import boxIcon from '@/platforms/dynamics-sales/logos/box';
import fullIcon from '@/platforms/dynamics-sales/logos/full';
import { auth, platform, toQueryString } from '@/sdk';
import { client } from './client';
import * as constants from './constants';

const authUrl =
  'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';

export default platform('dynamics-sales', {
  auth: auth.oauth2({
    authUrl,
    tokenUrl: `https://login.microsoftonline.com/common/oauth2/v2.0/token`,
    questions: [
      {
        type: 'text',
        id: 'orgUrl',
        label: 'Organization URL',
      },
    ],
    url: ({ answers, scopes, clientId, redirectUrl, state }) => {
      const allScopes = [`${answers.orgUrl}/user_impersonation`, ...scopes];

      const query: Record<string, string> = {
        client_id: clientId,
        redirect_uri: redirectUrl,
        scope: allScopes.join(' '),
        state,
        response_type: 'code',
      };
      return `${authUrl}?${toQueryString(query)}`;
    },
  }),
  display: {
    name: 'Dynamics Sales',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#0067b8',
    },
    categories: ['crm'],
  },
  constants,
  client,
  actions: {},
});
