import { client } from '@/platforms/bamboohr/client';
import fullIcon from '@/platforms/bamboohr/logos/full';
import boxIcon from '@/platforms/bamboohr/logos/box';
import { auth, platform } from '@/sdk';

export default platform('bamboohr', {
  auth: auth.oauth2({
   authUrl: ({ answers }) => `${reg.clean(
        auth.authorization_url
      )}`,
   tokenUrl: ({ answers }) => `${reg.clean(auth.token_url)}`,
   authParams: {
      "request": "authorize"
}}),
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
