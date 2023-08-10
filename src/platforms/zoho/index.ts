import boxIcon from '@/platforms/zoho/logos/box';
import fullIcon from '@/platforms/zoho/logos/full';
import { auth, HttpsUrl, platform } from '@/sdk';
import { z } from 'zod';
import { client } from './client';
import * as constants from './constants';

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
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#F60014',
    },
    categories: ['crm'],
  },
  constants,
  client,
  actions: {},
});
