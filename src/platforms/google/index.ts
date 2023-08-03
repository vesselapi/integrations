import { client } from '@/platforms/google/client';
import fullIcon from '@/platforms/google/logos/full';
import boxIcon from '@/platforms/google/logos/box';
import { auth, platform } from '@/sdk';

export default platform('google', {
  auth: auth.oauth2({
   authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
   tokenUrl: "https://oauth2.googleapis.com/token",
   authParams: {
      "access_type": "offline",
      "prompt": "consent"
}
    }),
  display: {
    name: 'Google',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#34A853',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
