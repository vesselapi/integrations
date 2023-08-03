import { client } from '@/platforms/wave-accounting/client';
import fullIcon from '@/platforms/wave-accounting/logos/full';
import boxIcon from '@/platforms/wave-accounting/logos/box';
import { auth, platform } from '@/sdk';

export default platform('wave-accounting', {
  auth: auth.oauth2({
   authUrl: "https://api.waveapps.com/oauth2/authorize",
   tokenUrl: "https://api.waveapps.com/oauth2/token"
    }),
  display: {
    name: 'Wave Accounting',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#E9ABFF',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
