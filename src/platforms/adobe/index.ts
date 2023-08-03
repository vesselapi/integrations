import { client } from '@/platforms/adobe/client';
import fullIcon from '@/platforms/adobe/logos/full';
import boxIcon from '@/platforms/adobe/logos/box';
import { auth, platform } from '@/sdk';

export default platform('adobe', {
  auth: auth.oauth2({ authUr: https://ims-na1.adobelogin.com/ims/authorize/v2,
 tokenUrl: https://ims-na1.adobelogin.com/ims/token/v3,
 defaultScopes: ["offline_access"],
 authParams: {"response_type":"code"}),
  display: {
    name: 'Adobe',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#ff0000',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
