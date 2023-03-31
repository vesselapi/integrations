import { auth, platform } from '@/sdk';

import getAccount from '@/platforms/outreach/actions/accounts/find';
import listAccounts from '@/platforms/outreach/actions/accounts/list';
import listMailboxes from '@/platforms/outreach/actions/mailboxes/list';
import getMailing from '@/platforms/outreach/actions/mailings/find';
import listMailings from '@/platforms/outreach/actions/mailings/list';
import createProspect from '@/platforms/outreach/actions/prospects/create';
import getProspect from '@/platforms/outreach/actions/prospects/find';
import listProspects from '@/platforms/outreach/actions/prospects/list';
import updateProspect from '@/platforms/outreach/actions/prospects/update';
import createSequenceState from '@/platforms/outreach/actions/sequence-states/create';
import getSequence from '@/platforms/outreach/actions/sequences/find';
import listSequences from '@/platforms/outreach/actions/sequences/list';
import getUser from '@/platforms/outreach/actions/users/find';
import listUsers from '@/platforms/outreach/actions/users/list';
import { client } from '@/platforms/outreach/client';
import * as constants from '@/platforms/outreach/constants';
import { icon } from '@/platforms/outreach/icon';

export * as types from './schemas';
export default platform('outreach', {
  auth: auth.oauth2({
    authUrl: 'https://api.outreach.io/oauth/authorize',
    tokenUrl: 'https://api.outreach.io/oauth/token',
    oauthBodyFormat: 'form',
    url: ({ scopes, clientId, redirectUrl, state }) => {
      const query = [
        ['client_id', encodeURIComponent(clientId)],
        ['redirect_uri', encodeURIComponent(redirectUrl)],
        ['scope', scopes.join(' ')],
        ['state', encodeURIComponent(state)],
        ['response_type', 'code'],
      ]
        .map((x) => x.join('='))
        .join('&');
      return `https://api.outreach.io/oauth/authorize?${query}`;
    },
  }),
  display: {
    name: 'Outreach',
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
  },
});
