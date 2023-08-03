import { client } from '@/platforms/squareup/client';
import fullIcon from '@/platforms/squareup/logos/full';
import boxIcon from '@/platforms/squareup/logos/box';
import { auth, platform } from '@/sdk';

export default platform('squareup', {
  auth: auth.oauth2({
   authUrl: "https://connect.squareup.com/oauth2/authorize",
   tokenUrl: "https://connect.squareup.com/oauth2/token",
   scopeSeparator: '+',
   authParams: {
      "session": false
}
    }),
  display: {
    name: 'Squareup',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#006AFF',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
