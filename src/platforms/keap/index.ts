import { client } from '@/platforms/keap/client';
import fullIcon from '@/platforms/keap/logos/full';
import boxIcon from '@/platforms/keap/logos/box';
import { auth, platform } from '@/sdk';

export default platform('keap', {
  auth: auth.oauth2({
   authUrl: "https://accounts.infusionsoft.com/app/oauth/authorize",
   tokenUrl: "https://api.infusionsoft.com/token"
    }),
  display: {
    name: 'Keap',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#36a635',
    },
    categories: ["crm"],
  },
  client,
  constants: {},
  actions: {},
});
