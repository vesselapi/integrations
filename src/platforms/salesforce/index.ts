import { client } from '@/platforms/salesforce/client';
import * as constants from '@/platforms/salesforce/constants';
import { icon } from '@/platforms/salesforce/icon';
import { auth, platform } from '@/sdk';
import {
  SalesforceAuthAnswers,
  salesforceOAuthUrlsByAccountType,
} from './schemas';

import createContact from '@/platforms/salesforce/actions/contacts/create';
import findContact from '@/platforms/salesforce/actions/contacts/find';
import listContacts from '@/platforms/salesforce/actions/contacts/list';
import updateContact from '@/platforms/salesforce/actions/contacts/update';

import findList from '@/platforms/salesforce/actions/lists/find';
import listLists from '@/platforms/salesforce/actions/lists/list';

import findUser from '@/platforms/salesforce/actions/users/find';
import listUsers from '@/platforms/salesforce/actions/users/list';

export * as types from './schemas';
export default platform('salesforce', {
  auth: auth.oauth2<SalesforceAuthAnswers>({
    authUrl: ({ answers }) =>
      `${salesforceOAuthUrlsByAccountType[answers.accountType]}/authorize`,
    tokenUrl: ({ answers }) =>
      `${salesforceOAuthUrlsByAccountType[answers.accountType]}/token`,
    questions: [
      {
        type: 'select',
        id: 'accountType',
        label: 'Account Type',
        options: [
          { label: 'Production', value: 'Production' },
          { label: 'Sandbox', value: 'Sandbox' },
        ],
      },
    ],
  }),
  display: {
    name: 'Salesforce',
    iconURI: icon,
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
    findUser,
  },
});
