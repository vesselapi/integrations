import { auth, platform } from '@/sdk';

import { client } from '@/platforms/salesforce/client';
import * as constants from '@/platforms/salesforce/constants';
import { icon } from '@/platforms/salesforce/icon';
import {
  SalesforceAuthAnswers,
  salesforceOAuthUrlsByAccountType,
} from './schemas';

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
  actions: {},
});
