import { client } from '@/platforms/typeform/client';
import fullIcon from '@/platforms/typeform/logos/full';
import boxIcon from '@/platforms/typeform/logos/box';
import { auth, platform } from '@/sdk';

export default platform('typeform', {
  auth: auth.oauth2({
   authUrl: "https://api.typeform.com/oauth/authorize",
   tokenUrl: "https://api.typeform.com/oauth/token",
   requiredScopes: ["offline"]
    }),
  display: {
    name: 'Typeform',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#0445AF',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
