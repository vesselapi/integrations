import { auth, platform } from '../../sdk';
import callsFind from './actions/calls/find';
import callsList from './actions/calls/list';
import contactsFind from './actions/contacts/find';
import contactsList from './actions/contacts/list';
import usersFind from './actions/users/find';
import usersList from './actions/users/list';
import client from './client';
import * as constants from './constants';
import { icon } from './icon';

export * as types from './schemas';
export default platform('dialpad', {
  // TODO: Branch url based off isSandbox.
  auth: [
    auth.oauth2({
      authUrl: `https://dialpad.com/oauth2/authorize`,
      tokenUrl: `https://dialpad.com/oauth2/token`,
      default: true,
    }),
    auth.apiToken(),
  ],
  display: {
    name: 'Dialpad',
    iconURI: icon,
  },
  constants,
  client,
  actions: {
    usersList,
    usersFind,
    contactsFind,
    contactsList,
    callsFind,
    callsList,
  },
});
