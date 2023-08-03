import { client } from '@/platforms/facebook/client';
import fullIcon from '@/platforms/facebook/logos/full';
import boxIcon from '@/platforms/facebook/logos/box';
import { auth, platform } from '@/sdk';

export default platform('facebook', {
  auth: auth.oauth2({
   authUrl: "https://www.facebook.com/v15.0/dialog/oauth",
   tokenUrl: "https://graph.facebook.com/v15.0/oauth/access_token"
    }),
  display: {
    name: 'Facebook',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#1877f2',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
