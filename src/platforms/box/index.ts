import { client } from '@/platforms/box/client';
import fullIcon from '@/platforms/box/logos/full';
import boxIcon from '@/platforms/box/logos/box';
import { auth, platform } from '@/sdk';

export default platform('box', {
  auth: auth.oauth2({
   authUrl: "https://account.box.com/api/oauth2/authorize",
   tokenUrl: "https://api.box.com/oauth2/token"}),
  display: {
    name: 'Box',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#8EA6B2',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
