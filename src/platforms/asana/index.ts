import { client } from '@/platforms/asana/client';
import fullIcon from '@/platforms/asana/logos/full';
import boxIcon from '@/platforms/asana/logos/box';
import { auth, platform } from '@/sdk';

export default platform('asana', {
  auth: auth.oauth2({ authUr: https://app.asana.com/-/oauth_authorize,
 tokenUrl: https://app.asana.com/-/oauth_token),
  display: {
    name: 'Asana',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#ff6d92',
    },
    categories: ["ticketing"],
  },
  client,
  constants: {},
  actions: {},
});
