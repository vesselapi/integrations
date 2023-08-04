import { auth, platform } from '@/sdk';

import boxIcon from '@/platforms/monday/logos/box';
import fullIcon from '@/platforms/monday/logos/full';
import client from './client';
import * as constants from './constants';

import query from '@/platforms/monday/actions/graphql/query';

import listBoards from '@/platforms/monday/actions/boards/list';

import createGroups from '@/platforms/monday/actions/groups/create';

import createItems from '@/platforms/monday/actions/items/create';

export * as types from './schemas';

export default platform('monday', {
  auth: [
    auth.apiToken({
      default: true,
    }),
    auth.oauth2({
      authUrl: `https://auth.monday.com/oauth2/authorize`,
      tokenUrl: `https://auth.monday.com/oauth2/token`,
      tokenAuth: 'body',
      isRetryable: async ({ status }) => status === 401,
    }),
  ],
  display: {
    name: 'monday.com',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#f62b54',
    },
    categories: ['crm'],
  },
  constants,
  client,
  actions: {
    query,

    listBoards,

    createGroups,

    createItems,
  },
});
