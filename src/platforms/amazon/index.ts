import { client } from '@/platforms/amazon/client';
import boxIcon from '@/platforms/amazon/logos/box';
import fullIcon from '@/platforms/amazon/logos/full';
import { auth, platform } from '@/sdk';

export default platform('amazon', {
  auth: auth.oauth2({
    authUrl: `https://www.amazon.com/ap/oa`,
    tokenUrl: ({ answers }) =>
      `https://api.amazon.${answers.extension}/auth/o2/token`,
    questions: [
      {
        type: 'text',
        id: 'extension',
        label: 'What is your Amazon extension?',
      },
    ],
  }),
  display: {
    name: 'Amazon',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#ff9900',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
