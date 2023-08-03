import { client } from '@/platforms/freshbooks/client';
import fullIcon from '@/platforms/freshbooks/logos/full';
import boxIcon from '@/platforms/freshbooks/logos/box';
import { auth, platform } from '@/sdk';

export default platform('freshbooks', {
  auth: auth.oauth2({
   authUrl: "https://auth.freshbooks.com/oauth/authorize",
   tokenUrl: "https://api.freshbooks.com/auth/oauth/token"
    }),
  display: {
    name: 'Freshbooks',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#0075DD',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
