import { client } from '@/platforms/bitbucket/client';
import boxIcon from '@/platforms/bitbucket/logos/box';
import fullIcon from '@/platforms/bitbucket/logos/full';
import { auth, platform } from '@/sdk';

export default platform('bitbucket', {
  auth: auth.oauth2({
    authUrl: 'https://bitbucket.org/site/oauth2/authorize',
    tokenUrl: 'https://bitbucket.org/site/oauth2/access_token',
    questions: [
      {
        type: 'text',
        id: 'subdomain',
        label: 'What is your Bitbucket subdomain?',
      },
    ],
  }),
  display: {
    name: 'Bitbucket',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#0052cc',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
