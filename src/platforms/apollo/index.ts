import { auth, platform } from '../../sdk';
import { client } from './client';
import * as constants from './constants';
import { icon } from './icon';

import createAccount from './actions/accounts/create';
import searchAccounts from './actions/accounts/search';
import updateAccount from './actions/accounts/update';

import listActivities from './actions/activities/list';

import createContact from './actions/contacts/create';
import searchContacts from './actions/contacts/search';
import updateContact from './actions/contacts/update';

import createCustomField from './actions/custom-fields/create';
import listCustomFields from './actions/custom-fields/list';

import searchEmails from './actions/emails/search';

import listEmailAccounts from './actions/email-accounts/list';

import markTasksComplete from './actions/tasks/mark-complete';
import searchTasks from './actions/tasks/search';

import createCall from './actions/calls/create';
import callDetails from './actions/calls/details';
import listCallDispositions from './actions/calls/dispositions-list';

import createSequence from './actions/sequences/create';
import searchSequences from './actions/sequences/search';
import startSequence from './actions/sequences/start';

import createSequenceStep from './actions/sequence-steps/create';

import updateSequenceTemplate from './actions/sequence-templates/update';

import searchUsers from './actions/users/search';

import searchLabels from './actions/labels/search';

import searchPeople from './actions/people/search';

export * as types from './schemas';
export default platform('apollo', {
  auth: [
    auth.apiToken({
      display: {
        markdown: `- Please ensure your Apollo API key is a Master Key.
- For detailed steps on how to create your Apollo API key, please see this [tutorial](https://docs.vessel.dev/pages/home/hidden/apollo).`,
      },
      default: true,
    }),
  ],
  display: {
    name: 'Apollo',
    iconURI: icon,
    icons: {
      defaultURI: icon,
    },
    categories: ['engagement'],
  },
  constants,
  client,
  actions: {
    createAccount,
    searchAccounts,
    updateAccount,

    listActivities,

    createContact,
    searchContacts,
    updateContact,

    createCustomField,
    listCustomFields,

    searchEmails,

    listEmailAccounts,

    searchTasks,
    markTasksComplete,

    createCall,
    listCallDispositions,
    callDetails,

    createSequence,
    searchSequences,
    startSequence,

    createSequenceStep,

    updateSequenceTemplate,

    searchUsers,

    searchLabels,

    searchPeople,
  },
});
