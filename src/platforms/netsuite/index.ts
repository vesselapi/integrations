import { client } from '@/platforms/netsuite/client';
import fullIcon from '@/platforms/netsuite/logos/full';
import boxIcon from '@/platforms/netsuite/logos/box';
import { auth, platform } from '@/sdk';

export default platform('netsuite', {
  auth: auth.oauth2({
   authUrl: ({ answers }) => `https://${answers.accountId}.app.netsuite.com/app/login/oauth2/authorize.nl`,
   tokenUrl: ({ answers }) => `https://${answers.accountId}.suitetalk.api.netsuite.com/services/rest/auth/oauth2/v1/token`,
   requiredScopes: ["restlets"],
   questions: [{"id":"accountId","label":"What is your Netsuite AccountId?","type":"text"}]
    }),
  display: {
    name: 'Netsuite',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#403C38',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
