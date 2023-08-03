import { client } from '@/platforms/pandadoc/client';
import fullIcon from '@/platforms/pandadoc/logos/full';
import boxIcon from '@/platforms/pandadoc/logos/box';
import { auth, platform } from '@/sdk';

export default platform('pandadoc', {
  auth: auth.oauth2({
   authUrl: "https://app.pandadoc.com/oauth2/authorize",
   tokenUrl: "https://api.pandadoc.com/oauth2/access_token"
    }),
  display: {
    name: 'Pandadoc',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#47b972',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
