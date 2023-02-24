import { platform } from '../../sdk';
import createLead from './actions/create-lead';
import findLead from './actions/find-lead';
import client from './client';

export default platform('hubspot', {
  auth: {
    type: 'oauth',
    apply: () => {},
  },
  client,
  actions: [createLead, findLead],
});
