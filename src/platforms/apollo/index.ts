import { auth, platform } from '../../sdk';
import { client } from './client';
import * as constants from './constants';
import { icon } from './icon';

import createAccount from './actions/accounts/create';
import listAccounts from './actions/accounts/list';
import searchAccount from './actions/accounts/search';
import updateAccount from './actions/accounts/update';

import listActivities from './actions/activities/list';

import createContact from './actions/accounts/create';
import listContacts from './actions/accounts/list';
import searchContact from './actions/accounts/search';
import updateContact from './actions/accounts/update';

import createCustomField from './actions/customFields/create';
import listCustomFields from './actions/customFields/list';

import searchEmails from './actions/emails/search';

import listEmailAccounts from './actions/emailAccounts/list';

import createSequences from './actions/sequences/create';
import listSequences from './actions/sequences/list';
import startSequence from './actions/sequences/start';

import createSequenceSteps from './actions/sequenceSteps/create';

import createSequenceTemplates from './actions/sequenceTemplates/create';

import listUsers from './actions/users/list';

export * as types from './schemas';
export default platform('apollo', {
  auth: [
    auth.apiToken({
      display: {
        markdown: `- Please ensure your Apollo API key is a Master Key.
- For detailed steps on how to create your Apollo API key, please see this [tutorial](https://docs.vessel.land/integrations/apollo).`,
      },
    }),
  ],
  display: {
    name: 'Apollo',
    iconURI: icon,
  },
  constants,
  client,
  actions: {
    createAccount,
    listAccounts,
    updateAccount,
    searchAccount,

    listActivities,

    createContact,
    listContacts,
    updateContact,
    searchContact,

    createCustomField,
    listCustomFields,

    searchEmails,

    listEmailAccounts,

    createSequences,
    listSequences,
    startSequence,

    createSequenceSteps,

    createSequenceTemplates,

    listUsers,
  },
});
