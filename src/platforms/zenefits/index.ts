import { client } from '@/platforms/zenefits/client';
import fullIcon from '@/platforms/zenefits/logos/full';
import boxIcon from '@/platforms/zenefits/logos/box';
import { auth, platform } from '@/sdk';

export default platform('zenefits', {
  auth: auth.oauth2({
   authUrl: "https://secure.zenefits.com/oauth2/platform-authorize",
   tokenUrl: "https://secure.zenefits.com/oauth2/token"
    }),
  display: {
    name: 'Zenefits',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#FF5745',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
