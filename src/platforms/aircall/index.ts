import boxIcon from '@/platforms/aircall/logos/box';
import fullIcon from '@/platforms/aircall/logos/full';
import { auth, platform } from '../../sdk';
import { client } from './client';
import * as constants from './constants';

import findUser from './actions/user/find';
import listUser from './actions/user/list';
import startCallUser from './actions/user/start-call';

import createContact from './actions/contacts/create';
import findContact from './actions/contacts/find';
import listContact from './actions/contacts/list';
import updateContact from './actions/contacts/update';

import findCall from './actions/calls/find';
import listCall from './actions/calls/list';

export * as types from './schemas';
export default platform('aircall', {
  auth: [
    auth.oauth2({
      authUrl: 'https://dashboard.aircall.io/oauth/authorize',
      tokenUrl: 'https://api.aircall.io/v1/oauth/token',
    }),
    auth.apiToken({
      questions: [
        {
          type: 'text',
          id: 'api-id',
          label: 'API ID',
        },
      ],
      default: true,
    }),
  ],
  display: {
    name: 'Aircall',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#00b388',
    },
    categories: ['dialer'],
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
  },
});
