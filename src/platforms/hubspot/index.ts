import { auth, platform } from '../../sdk';
import createLead from './actions/create-lead';
import findLead from './actions/find-lead';
import client from './client';
import { icon } from './icon';

export default platform('hubspot', {
  auth: auth.oauth2({
    authUrl: 'https://app.hubspot.com/oauth/authorize',
    tokenUrl: 'https://api.hubapi.com/oauth/v1/token',
    questions: [],
    defaultScopes: [
      'crm.lists.write',
      'crm.lists.read',
      'crm.objects.companies.write',
      'crm.objects.companies.read',
      'crm.objects.contacts.write',
      'crm.objects.contacts.read',
      'crm.objects.deals.write',
      'crm.objects.deals.read',
      'crm.objects.owners.read',
      'crm.schemas.companies.write',
      'crm.schemas.companies.read',
      'crm.schemas.contacts.write',
      'crm.schemas.contacts.read',
      'crm.schemas.deals.write',
      'crm.schemas.deals.read',
    ],
    url: ({ scopes, clientId, redirectUrl, state }) => {
      const query = [
        ['client_id', clientId],
        ['redirect_uri', redirectUrl],
        ['scope', scopes.join('+')],
        ['state', JSON.stringify(state)],
      ]
        .map((x) => x.join('='))
        .join('&');
      return `https://app.hubspot.com/oauth/authorize?${query}`;
    },
  }),
  display: {
    name: 'HubSpot',
    iconURI: icon,
  },
  client,
  actions: [createLead, findLead],
});
