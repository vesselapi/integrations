import { auth, platform } from '../../sdk';
import { icon } from './icon';

import findUser from './actions/user/find';
import listUser from './actions/user/list';
import startCallUser from './actions/user/startCall';

import createContact from './actions/contacts/create';
import findContact from './actions/contacts/find';
import listContact from './actions/contacts/list';
import updateContact from './actions/contacts/update';

import findCall from './actions/calls/find';
import listCall from './actions/calls/list';

export default platform('aircall', {
  auth: [
    auth.oauth2({
      authUrl: 'https://dashboard.aircall.io/oauth/authorize',
      tokenUrl: 'https://api.aircall.io/v1/oauth/token',
    }),
    auth.apiToken(),
  ],
  display: {
    name: 'Aircall',
    iconURI: icon,
  },
  client: {
    passthrough: async () => ({} as any),
  },
  actions: {
    listUser,
    findUser,
    startCallUser,

    createContact,
    findContact,
    listContact,
    updateContact,

    findCall,
    listCall,
  },
});
