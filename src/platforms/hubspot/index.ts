import { platform } from '../../sdk';
import createLead from './actions/create-lead';
import findLead from './actions/find-lead';
import client from './client';
import { icon } from './icon';

export default platform('hubspot', {
  auth: {
    type: 'oauth',
    apply: () => {},
  },
  display: {
    name: 'HubSpot',
    icon,
  },
  client,
  actions: [createLead, findLead],
});
