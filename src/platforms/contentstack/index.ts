import { client } from '@/platforms/contentstack/client';
import boxIcon from '@/platforms/contentstack/logos/box';
import fullIcon from '@/platforms/contentstack/logos/full';
import { auth, platform } from '@/sdk';

export default platform('contentstack', {
  auth: auth.oauth2({
    authUrl: ({ answers }) =>
      `https://${answers.subdomain}.contentstack.com/apps/${answers.appId}/authorize`,
    tokenUrl: ({ answers }) =>
      `https://${answers.subdomain}.contentstack.com/apps-api/apps/token`,
    questions: [
      {
        id: 'subdomain',
        label: 'What is your Contentstack Subdomain?',
        type: 'text',
      },
      { id: 'appId', label: 'What is your Contentstack AppId?', type: 'text' },
    ],
  }),
  display: {
    name: 'Contentstack',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#e74c3d',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
