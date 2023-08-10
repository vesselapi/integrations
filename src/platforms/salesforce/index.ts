import { client } from '@/platforms/salesforce/client';
import * as constants from '@/platforms/salesforce/constants';
import boxIcon from '@/platforms/salesforce/logos/box';
import fullIcon from '@/platforms/salesforce/logos/full';
import { auth, platform } from '@/sdk';
import {
  SalesforceAccountType,
  salesforceOAuthUrlsByAccountType,
} from './schemas';

import query from '@/platforms/salesforce/actions/soql/query';

import createContact from '@/platforms/salesforce/actions/contacts/create';
import findContact from '@/platforms/salesforce/actions/contacts/find';
import listContacts from '@/platforms/salesforce/actions/contacts/list';
import updateContact from '@/platforms/salesforce/actions/contacts/update';

import findListView from '@/platforms/salesforce/actions/list-views/find';
import listListViews from '@/platforms/salesforce/actions/list-views/list';

import findListViewResult from './actions/list-view-results/find';

import findUser from '@/platforms/salesforce/actions/users/find';
import listUsers from '@/platforms/salesforce/actions/users/list';

export * as utils from './actions/pagination';
export * as constants from './constants';
export * as types from './schemas';

export default platform('salesforce', {
  auth: auth.oauth2({
    authUrl: ({ answers }) =>
      `${
        salesforceOAuthUrlsByAccountType[
          answers.accountType as SalesforceAccountType
        ]
      }/authorize`,
    tokenUrl: ({ answers }) =>
      `${
        salesforceOAuthUrlsByAccountType[
          answers.accountType as SalesforceAccountType
        ]
      }/token`,
    questions: [
      {
        type: 'select',
        id: 'accountType',
        label: 'Account Type',
        options: [
          { label: 'Production', value: 'Production', default: true },
          { label: 'Sandbox', value: 'Sandbox' },
        ],
      },
    ],
    default: true,
  }),
  display: {
    name: 'Salesforce',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#00a1e0',
    },
    categories: ['crm'],
  },
  client,
  constants,
  actions: {
    query,
    createContact,
    findContact,
    listContacts,
    updateContact,
    findListView,
    listListViews,
    findListViewResult,
    listUsers,
    findUser,
  },
});
