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

export * as types from './schemas';
export default platform('ringcentral', {
  // TODO: Branch url based off isSandbox.
  auth: auth.oauth2({
    authUrl: `https://platform.devtest.ringcentral.com/restapi/oauth/authorize`,
    tokenUrl: `https://platform.devtest.ringcentral.com/restapi/oauth/token`,
    oauthBodyFormat: 'form',
    tokenAuth: 'header',
    url: ({ clientId, redirectUrl, state }) => {
      const query = [
        ['client_id', encodeURIComponent(clientId)],
        ['redirect_uri', encodeURIComponent(redirectUrl)],
        ['state', encodeURIComponent(state)],
        ['response_type', 'code'],
      ]
        .map((x) => x.join('='))
        .join('&');
      return `https://platform.devtest.ringcentral.com/restapi/oauth/authorize?${query}`;
    },
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
