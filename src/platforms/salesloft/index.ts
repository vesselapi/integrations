import { auth, platform } from '@/sdk';

import { client } from '@/platforms/salesloft/client';
import * as constants from '@/platforms/salesloft/constants';
import { icon } from '@/platforms/salesloft/icon';

import createCadenceMembership from './actions/cadence-memberships/create';

import importCadence from './actions/cadences/import';
import listCadences from './actions/cadences/list';

import createCustomField from './actions/custom-fields/create';
import listCustomFields from './actions/custom-fields/list';

import findEmailBodies from './actions/email-bodies/find';
import findEmail from './actions/emails/find';
import listEmails from './actions/emails/list';

import createPeople from './actions/people/create';
import findPerson from './actions/people/find';
import listPeople from './actions/people/list';
import updatePerson from './actions/people/update';

import findUsers from './actions/users/find';
import listUsers from './actions/users/list';

export * as types from './schemas';
export default platform('salesloft', {
  auth: [
    auth.oauth2({
      authUrl: 'https://accounts.salesloft.com/oauth/authorize',
      tokenUrl: 'https://accounts.salesloft.com/oauth/token',
      default: true,
    }),
    auth.apiToken(),
  ],
  display: {
    name: 'Salesloft',
    iconURI: icon,
    categories: ['engagement'],
  },
  client,
  constants,
  actions: {
    createCadenceMembership,

    importCadence,
    listCadences,

    createCustomField,
    listCustomFields,

    findEmailBodies,
    listEmails,
    findEmail,

    createPeople,
    listPeople,
    findPerson,
    updatePerson,

    findUsers,
    listUsers,
  },
});
