import { client } from '@/platforms/affinity/client';
import boxIcon from '@/platforms/affinity/logos/box';
import fullIcon from '@/platforms/affinity/logos/full';
import { auth, platform } from '@/sdk';

export default platform('affinity', {
  auth: auth.basic({
    questions: [{ type: 'text', id: 'password', label: 'API Token' }],
  }),
  display: {
    name: 'Affinity',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#1050d6',
    },
    categories: ['crm'],
  },
  client,
  constants: {},
  actions: {},
});
