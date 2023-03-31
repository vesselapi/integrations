import { auth, platform } from '@/sdk';

import getAccount from '@/platforms/salesloft/actions/accounts/find';
import listAccounts from '@/platforms/salesloft/actions/accounts/list';
import listMailboxes from '@/platforms/salesloft/actions/mailboxes/list';
import getMailing from '@/platforms/salesloft/actions/mailings/find';
import listMailings from '@/platforms/salesloft/actions/mailings/list';
import createProspect from '@/platforms/salesloft/actions/prospects/create';
import getProspect from '@/platforms/salesloft/actions/prospects/find';
import listProspects from '@/platforms/salesloft/actions/prospects/list';
import updateProspect from '@/platforms/salesloft/actions/prospects/update';
import createSequenceState from '@/platforms/salesloft/actions/sequence-states/create';
import createSequenceTemplate from '@/platforms/salesloft/actions/sequence-templates/create';
import createSequence from '@/platforms/salesloft/actions/sequences/create';
import getSequence from '@/platforms/salesloft/actions/sequences/find';
import listSequences from '@/platforms/salesloft/actions/sequences/list';
import createTemplate from '@/platforms/salesloft/actions/templates/create';
import getUser from '@/platforms/salesloft/actions/users/find';
import listUsers from '@/platforms/salesloft/actions/users/list';
import { client } from '@/platforms/salesloft/client';
import * as constants from '@/platforms/salesloft/constants';
import { icon } from '@/platforms/salesloft/icon';

export * as types from './schemas';
export default platform('salesloft', {
  auth: [
    auth.oauth2({
      authUrl: 'https://accounts.salesloft.com/oauth/authorize',
      tokenUrl: 'https://accounts.salesloft.com/oauth/token',
    }),
    auth.apiToken({ default: true }),
  ],
  display: {
    name: 'Salesloft',
    iconURI: icon,
  },
  client,
  constants,
  actions: {
    getAccount,
    listAccounts,
    listMailboxes,
    getMailing,
    listMailings,
    createProspect,
    getProspect,
    listProspects,
    updateProspect,
    createSequenceState,
    getSequence,
    listSequences,
    getUser,
    listUsers,
    createSequence,
    createTemplate,
    createSequenceTemplate,
  },
});
