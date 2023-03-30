import { auth, platform } from '@/sdk';

import getAccount from '@/platforms/outreach/actions/accounts/get-account';
import listAccounts from '@/platforms/outreach/actions/accounts/list-accounts';
import listMailboxes from '@/platforms/outreach/actions/mailboxes/list-mailboxes';
import getMailing from '@/platforms/outreach/actions/mailings/get-mailing';
import listMailings from '@/platforms/outreach/actions/mailings/list-mailings';
import createProspect from '@/platforms/outreach/actions/prospects/create-prospect';
import getProspect from '@/platforms/outreach/actions/prospects/get-prospect';
import listProspects from '@/platforms/outreach/actions/prospects/list-prospects';
import updateProspect from '@/platforms/outreach/actions/prospects/update-prospect';
import createSequenceState from '@/platforms/outreach/actions/sequence-states/create-sequence-state';
import getSequence from '@/platforms/outreach/actions/sequences/get-sequence';
import listSequences from '@/platforms/outreach/actions/sequences/list-sequences';
import getUser from '@/platforms/outreach/actions/users/get-user';
import listUsers from '@/platforms/outreach/actions/users/list-users';
import { client } from '@/platforms/outreach/client';
import * as constants from '@/platforms/outreach/constants';
import { icon } from '@/platforms/outreach/icon';

export default platform('outreach', {
  auth: auth.oauth2({
    authUrl: 'https://api.outreach.io/oauth/authorize',
    tokenUrl: 'https://api.outreach.io/oauth/token',
    url: ({ scopes, clientId, redirectUrl, state }) => {
      const query = [
        ['client_id', clientId],
        ['redirect_uri', redirectUrl],
        ['scope', scopes.join(' ')],
        ['state', state],
      ]
        .map((x) => x.join('='))
        .join('&');
      return `https://api.outreach.io/oauth/authorize?${encodeURI(query)}`;
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
