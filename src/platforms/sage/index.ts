import { client } from '@/platforms/sage/client';
import fullIcon from '@/platforms/sage/logos/full';
import boxIcon from '@/platforms/sage/logos/box';
import { auth, platform } from '@/sdk';

export default platform('sage', {
  auth: auth.oauth2({
   authUrl: "https://www.sageone.com/oauth2/auth/central",
   tokenUrl: "https://oauth.accounting.sage.com/token",
   authParams: {
      "filter": "apiv3.1"
}
    }),
  display: {
    name: 'Sage',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#00D639',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
