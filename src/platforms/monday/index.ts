import { auth, platform } from '@/sdk';

import client from './client';
import * as constants from './constants';
import { icon } from './icon';

import query from '@/platforms/monday/actions/graphql/query';

import listBoards from '@/platforms/monday/actions/boards/list';

import createItems from '@/platforms/monday/actions/items/create';

export * as types from './schemas';

export default platform('monday', {
  auth: [
    auth.apiToken({}),
    auth.oauth2({
      default: true,
      authUrl: `https://auth.monday.com/oauth2/authorize`,
      authUrlQuery: { response_type: 'install' },
      tokenUrl: `https://auth.monday.com/oauth2/token`,
      tokenAuth: 'body',
      isRetryable: async ({ status }) => status === 401,
    }),
  ],
  display: { name: 'monday.com', iconURI: icon, categories: ['crm'] },
  constants,
  client,
  actions: {
    query,

    listBoards,

    createItems,
  },
});
