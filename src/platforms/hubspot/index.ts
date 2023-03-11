import { auth, platform } from '../../sdk';
import createLead from './actions/create-lead';
import findLead from './actions/find-lead';
import { icon } from './icon';

export default platform('hubspot', {
  auth: auth.oauth2({
    authUrl: 'https://app.hubspot.com/oauth/authorize',
    tokenUrl: 'https://api.hubapi.com/oauth/v1/token',
  }),
  display: {
    name: 'HubSpot',
    iconURI: icon,
  },
  request: async (options) => {},
  actions: {
    createLead,
    findLead,
  },
  // unifications: {
  //   crm: {
  //     findLead,
  //   },
  // },
});
