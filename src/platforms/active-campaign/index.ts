import { auth, platform } from '@/sdk';

import { client } from '@/platforms/active-campaign/client';
import * as constants from '@/platforms/active-campaign/constants';
import { icon } from '@/platforms/active-campaign/icon';

export * as types from './schemas';
export default platform('activecampaign', {
  auth: auth.apiToken({
    questions: [
      {
        id: 'domain',
        type: 'string',
        label:
          'What is your account API URL? Your API URL can be found in your account on the My Settings page under the "Developer" tab. It will look something like https://<your-account>.api-us1.com',
      },
    ],
  }),
  display: {
    name: 'Active Campaign',
    iconURI: icon,
  },
  client,
  constants,
  actions: {},
});
