import { client } from '@/platforms/exact-online/client';
import defaultIcon from '@/platforms/defaultIcon';
import { add } from 'date-fns';
import { auth, platform } from '@/sdk';

export default platform('exact-online', {
  auth: auth.oauth2({
   authUrl: ({ answers }) => `https://start.exactonline.${answers.extension}/api/oauth2/auth`,
   tokenUrl: ({ answers }) => `https://start.exactonline.${answers.extension}/api/oauth2/token`,
   tokenAuth: 'header',
   questions: [{"id":"extension","label":"What is your Exact Online extension?","type":"text"}],
   tokenRefreshAt: () => add(Date.now(), { seconds: 30 })
    }),
  display: {
    name: 'Exact Online',
    logos: {
     defaultURI: defaultIcon,
    },
    colors: {
      primary: '#ff6f0e',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});