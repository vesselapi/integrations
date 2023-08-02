import { auth, platform, SelectAuthQuestion } from '../../sdk';
import callsFind from './actions/calls/find';
import callsList from './actions/calls/list';
import callsStart from './actions/calls/start';
import contactsCreate from './actions/contacts/create';
import contactsFind from './actions/contacts/find';
import contactsList from './actions/contacts/list';
import contactsUpdate from './actions/contacts/update';
import usersFind from './actions/users/find';
import usersList from './actions/users/list';
import client from './client';
import * as constants from './constants';
import { icon } from './icon';
import { DialpadAuthAnswers, dialpadUrlsByAccountType } from './schemas';

const accountTypeQuestion: SelectAuthQuestion = {
  type: 'select',
  id: 'accountType',
  label: 'Account Type',
  options: [
    { label: 'Production', value: 'production', default: true },
    { label: 'Sandbox', value: 'sandbox' },
  ],
};

export * as types from './schemas';
export default platform('dialpad', {
  // TODO: Branch url based off isSandbox.
  auth: [
    auth.oauth2<DialpadAuthAnswers>({
      authUrl: ({ answers }) =>
        `${dialpadUrlsByAccountType[answers.accountType]}/oauth2/authorize`,
      tokenUrl: ({ answers }) =>
        `${dialpadUrlsByAccountType[answers.accountType]}/oauth2/token`,
      questions: [accountTypeQuestion],
      default: true,
    }),
    auth.apiToken<DialpadAuthAnswers>({
      questions: [accountTypeQuestion],
    }),
  ],
  display: {
    name: 'Dialpad',
    iconURI: icon,
    logos: {
      defaultURI: icon,
    },
    categories: ['dialer'],
  },
  constants,
  client,
  actions: {
    usersList,
    usersFind,

    contactsFind,
    contactsList,
    contactsCreate,
    contactsUpdate,

    callsFind,
    callsList,
    callsStart,
  },
});
