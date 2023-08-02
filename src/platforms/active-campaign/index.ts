import { auth, platform } from '@/sdk';

import createContact from '@/platforms/active-campaign/actions/contacts/create';
import findContact from '@/platforms/active-campaign/actions/contacts/find';
import listContacts from '@/platforms/active-campaign/actions/contacts/list';
import updateContact from '@/platforms/active-campaign/actions/contacts/update';
import findList from '@/platforms/active-campaign/actions/lists/find';
import listLists from '@/platforms/active-campaign/actions/lists/list';
import listUsers from '@/platforms/active-campaign/actions/users/list';
import { client } from '@/platforms/active-campaign/client';
import * as constants from '@/platforms/active-campaign/constants';
import { icon } from '@/platforms/active-campaign/icon';

export * as types from './schemas';
export default platform('activecampaign', {
  auth: auth.apiToken({
    questions: [
      {
        id: 'domain',
        type: 'text',
        label:
          'What is your account API URL? Your API URL can be found in your account on the My Settings page under the "Developer" tab. It will look something like https://<your-account>.api-us1.com',
      },
    ],
    default: true,
  }),
  display: {
    name: 'Active Campaign',
    iconURI: icon,
    logos: {
      defaultURI: icon,
    },
    categories: ['marketing-automation'],
  },
  client,
  constants,
  actions: {
    createContact,
    findContact,
    listContacts,
    updateContact,
    findList,
    listLists,
    listUsers,
  },
});
