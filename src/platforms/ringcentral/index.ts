import { auth, platform } from '../../sdk';
import callLogsList from './actions/call-logs/list';
import contactsCreate from './actions/contacts/create';
import contactsFind from './actions/contacts/find';
import contactsList from './actions/contacts/list';
import contactsUpdate from './actions/contacts/update';
import extensionsFind from './actions/extensions/find';
import extensionsList from './actions/extensions/list';
import extensionsRingOut from './actions/extensions/ring-out';
import client from './client';
import * as constants from './constants';
import { icon } from './icon';
import {
  RingcentralAuthAnswers,
  ringcentralUrlsByAccountType,
} from './schemas';

export * as types from './schemas';
export default platform('ringcentral', {
  // TODO: Branch url based off isSandbox.
  auth: auth.oauth2<RingcentralAuthAnswers>({
    authUrl: ({ answers }) =>
      `${ringcentralUrlsByAccountType[answers.accountType]}/oauth/authorize`,
    tokenUrl: ({ answers }) =>
      `${ringcentralUrlsByAccountType[answers.accountType]}/oauth/token`,
    oauthBodyFormat: 'form',
    tokenAuth: 'header',
    questions: [
      {
        type: 'select',
        id: 'accountType',
        label: 'Account Type',
        options: [{ label: 'Sandbox', value: 'sandbox', default: true }],
      },
    ],
  }),
  display: {
    name: 'Ringcentral',
    iconURI: icon,
    categories: ['dialer'],
  },
  constants,
  client,
  actions: {
    extensionsFind,
    extensionsList,
    extensionsRingOut,

    callLogsList,

    contactsList,
    contactsFind,
    contactsCreate,
    contactsUpdate,
  },
});
