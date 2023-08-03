import { client } from '@/platforms/health-gorilla/client';
import defaultIcon from '@/platforms/defaultIcon';
import { auth, platform } from '@/sdk';

export default platform('health-gorilla', {
  auth: auth.oauth2({
   authUrl: "https://api.healthgorilla.com/oauth/authorize",
   tokenUrl: "https://api.healthgorilla.com/oauth/token"
    }),
  display: {
    name: 'Google Sheets',
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
