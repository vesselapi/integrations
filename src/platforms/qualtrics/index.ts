import { client } from '@/platforms/qualtrics/client';
import boxIcon from '@/platforms/qualtrics/logos/box';
import fullIcon from '@/platforms/qualtrics/logos/full';
import { auth, platform } from '@/sdk';

export default platform('qualtrics', {
  auth: auth.oauth2({
    authUrl: ({ answers }) =>
      `https://${answers.subdomain}.qualtrics.com/oauth2/auth`,
    tokenUrl: ({ answers }) =>
      `https://${answers.subdomain}.qualtrics.com/oauth2/token`,
    questions: [
      {
        id: 'subdomain',
        label: 'What is your Contentstack Subdomain?',
        type: 'text',
      },
      { id: 'dc', label: 'What is your Qualtrics Datacenter?', type: 'text' },
    ],
  }),
  display: {
    name: 'Qualtrics',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#e4606d',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
