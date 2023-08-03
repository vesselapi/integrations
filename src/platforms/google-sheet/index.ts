import { client } from '@/platforms/google-sheet/client';
import defaultIcon from '@/platforms/defaultIcon';
import { auth, platform } from '@/sdk';

export default platform('google-sheet', {
  auth: auth.oauth2({
   authUrl: ""https://accounts.google.com/o/oauth2/v2/auth"",
   tokenUrl: ""https://oauth2.googleapis.com/token"",
   authParams: {
      "access_type": "offline",
      "prompt": "consent"
}
    }),
  display: {
    name: 'GSheet',
    logos: {
     defaultURI: defaultIcon,
    },
    colors: {
      primary: '#28a745',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
