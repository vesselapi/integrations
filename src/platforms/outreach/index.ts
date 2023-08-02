import { auth, platform } from '@/sdk';

import findAccount from '@/platforms/outreach/actions/accounts/find';
import listAccounts from '@/platforms/outreach/actions/accounts/list';
import listMailboxes from '@/platforms/outreach/actions/mailboxes/list';
import findMailing from '@/platforms/outreach/actions/mailings/find';
import listMailings from '@/platforms/outreach/actions/mailings/list';
import createProspect from '@/platforms/outreach/actions/prospects/create';
import findProspect from '@/platforms/outreach/actions/prospects/find';
import listProspects from '@/platforms/outreach/actions/prospects/list';
import updateProspect from '@/platforms/outreach/actions/prospects/update';
import createSequenceState from '@/platforms/outreach/actions/sequence-states/create';
import createSequenceTemplate from '@/platforms/outreach/actions/sequence-templates/create';
import createSequence from '@/platforms/outreach/actions/sequences/create';
import findSequence from '@/platforms/outreach/actions/sequences/find';
import listSequences from '@/platforms/outreach/actions/sequences/list';
import createTemplate from '@/platforms/outreach/actions/templates/create';
import findUser from '@/platforms/outreach/actions/users/find';
import listUsers from '@/platforms/outreach/actions/users/list';
import { client } from '@/platforms/outreach/client';
import * as constants from '@/platforms/outreach/constants';
import { icon } from '@/platforms/outreach/icon';
import listTags from './actions/tags/list';

export * as types from './schemas';
export default platform('outreach', {
  auth: auth.oauth2({
    authUrl: 'https://api.outreach.io/oauth/authorize',
    tokenUrl: 'https://api.outreach.io/oauth/token',
    oauthBodyFormat: 'form',
    scopeSeparator: ' ',
    default: true,
  }),
  display: {
    name: 'Outreach',
    iconURI: icon,
    logos: {
      defaultURI: icon,
    },
    categories: ['engagement'],
  },
  client,
  constants,
  actions: {
    findAccount,
    listAccounts,
    listMailboxes,
    findMailing,
    listMailings,
    createProspect,
    findProspect,
    listProspects,
    updateProspect,
    createSequenceState,
    findSequence,
    listSequences,
    findUser,
    listUsers,
    createSequence,
    createTemplate,
    createSequenceTemplate,
    listTags,
  },
});
