import { client } from '@/platforms/workable/client';
import boxIcon from '@/platforms/workable/logos/box';
import fullIcon from '@/platforms/workable/logos/full';
import { auth, platform } from '@/sdk';

export default platform('workable', {
  auth: auth.apiToken({
    questions: [
      {
        type: 'text',
        id: 'subdomain',
        label: 'What is your Workable subdomain?',
      },
    ],
  }),
  display: {
    name: 'Workable',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#00766a',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
