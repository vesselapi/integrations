import { auth, HttpsUrl, platform } from '@/sdk';
import { z } from 'zod';
import { client } from './client';
import * as constants from './constants';
import { icon } from './icon';

export default platform('zoho', {
  auth: auth.oauth2({
    authUrl: `https://accounts.zoho.com/oauth/v2/auth`,
    tokenUrl: ({ appMetadata, ...all }) => {
      console.log(appMetadata, all);
      return `${appMetadata['accounts-server']}/oauth/v2/token` as HttpsUrl;
    },
    appMetadataSchema: z.object({
      'accounts-server': z.string().url(),
    }),
  }),
  display: { name: 'Zoho', iconURI: icon, categories: ['crm'] },
  constants,
  client,
  actions: {},
});
