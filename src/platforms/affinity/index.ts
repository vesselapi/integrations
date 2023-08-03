import { client } from '@/platforms/affinity/client';
import { icon } from '@/platforms/affinity/icon';
import { auth, platform } from '@/sdk';

export default platform('affinity', {
  auth: auth.basic({
    questions: [{ type: 'text', id: 'password', label: 'API Token' }],
  }),
  display: {
    name: 'Affinity',
    iconURI: icon,
    logos: {
      defaultURI: icon,
    },
    categories: ['crm'],
  },
  client,
  constants: {},
  actions: {},
});
