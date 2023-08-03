import { client } from '@/platforms/mural/client';
import fullIcon from '@/platforms/mural/logos/full';
import boxIcon from '@/platforms/mural/logos/box';
import { auth, platform } from '@/sdk';

export default platform('mural', {
  auth: auth.oauth2({
   authUrl: "https://app.mural.co/api/public/v1/authorization/oauth2",
   tokenUrl: "https://app.mural.co/api/public/v1/authorization/oauth2/token"
    }),
  display: {
    name: 'Mural',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#5887FF',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
