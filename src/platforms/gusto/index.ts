import { client } from '@/platforms/gusto/client';
import boxIcon from '@/platforms/gusto/logos/box';
import fullIcon from '@/platforms/gusto/logos/full';
import { auth, platform } from '@/sdk';

export default platform('gusto', {
  auth: auth.oauth2({
    authUrl: 'https://api.gusto.com/oauth/authorize',
    tokenUrl: 'https://api.gusto.com/oauth/token',
    questions: [
      {
        id: 'subdomain',
        label: 'What is your Gitlab Subdomain?',
        type: 'text',
      },
    ],
  }),
  display: {
    name: 'Gusto',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#0A8080',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
