import { auth, HttpsUrl, platform } from '@/sdk';
import { z } from 'zod';
import { client } from './client';
import * as constants from './constants';
import { icon } from './icon';

export default platform('zoho', {
  auth: auth.oauth2({
    authUrl: `https://accounts.zoho.com/oauth/v2/auth`,
    tokenUrl: ({ callbackArgs }) =>
      `${callbackArgs['accounts-server']}/oauth/v2/token` as HttpsUrl,
    callbackArgsSchema: z.object({
      'accounts-server': z.string().url().optional(),
    }),
  }),
  display: {
    name: 'Zoho',
    iconURI: icon,
    logos: {
      defaultURI: icon,
    },
    categories: ['crm'],
  },
  constants,
  client,
  actions: {},
});
