import { client } from '@/platforms/one-drive/client';
import boxIcon from '@/platforms/one-drive/logos/box';
import { auth, platform } from '@/sdk';

export default platform('one-drive', {
  auth: auth.oauth2({
   authUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
   tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
   requiredScopes: ["offline_access"]
    }),
  display: {
    name: 'OneDrive',
    logos: {
     defaultURI: boxIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#0364b8',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
