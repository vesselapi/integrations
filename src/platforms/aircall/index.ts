import { auth, platform } from '../../sdk';
import { client } from './client';
import * as constants from './constants';
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

import passthrough from './actions/passthrough';

export * as types from './schemas';

export default platform('aircall', {
  // NOTE: Aircall Supports both API key and OAuth2, but we'll default to
  // API Token until we get access to an Aircall OAuth app.
  auth: [
    auth.oauth2({
      authUrl: 'https://dashboard.aircall.io/oauth/authorize',
      tokenUrl: 'https://api.aircall.io/v1/oauth/token',
    }),
    auth.apiToken({
      default: true,
    }),
  ],
  display: {
    name: 'Aircall',
    iconURI: icon,
  },
  constants,
  client,
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

    passthrough,
  },
});
