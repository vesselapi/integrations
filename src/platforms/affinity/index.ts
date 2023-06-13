import { client } from '@/platforms/affinity/client';
import { icon } from '@/platforms/affinity/icon';
import { auth, platform } from '@/sdk';

export default platform('affinity', {
  auth: auth.apiToken(),
  display: {
    name: 'Affinity',
    iconURI: icon,
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
