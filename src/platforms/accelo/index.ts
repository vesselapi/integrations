import { client } from '@/platforms/accelo/client';
import boxIcon from '@/platforms/accelo/logos/box';
import { auth, platform } from '@/sdk';

export default platform('accelo', {
  auth: auth.oauth2({
    authUrl: ({ answers }) =>
      `https://${answers.subdomain}.api.accelo.com/oauth2/v0/authorize`,
    tokenUrl: ({ answers }) =>
      `https://${answers.subdomain}.api.accelo.com/oauth2/v0/token`,
    scopeSeparator: ',',
    questions: [
      {
        type: 'text',
        id: 'subdomain',
        label: 'What is your Accelo subdomain?',
      },
    ],
  }),
  display: {
    name: 'Accelo',
    logos: {
      defaultURI: boxIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#eca53d',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
