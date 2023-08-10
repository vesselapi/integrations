import { client } from '@/platforms/bamboohr/client';
import boxIcon from '@/platforms/bamboohr/logos/box';
import fullIcon from '@/platforms/bamboohr/logos/full';
import { auth, platform } from '@/sdk';

export default platform('bamboohr', {
  auth: auth.oauth2({
    authUrl: ({ answers }) =>
      `https://${answers.subdomain}.bamboohr.com/authorize.php`,
    tokenUrl: ({ answers }) =>
      `https://${answers.subdomain}.bamboohr.com/token.php`,
    authParams: {
      request: 'authorize',
    },
    questions: [
      {
        type: 'text',
        id: 'subdomain',
        label: 'What is your BambooHR subdomain?',
      },
    ],
  }),
  display: {
    name: 'BambooHR',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#D5FE81',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
