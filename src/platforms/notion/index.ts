import { client } from '@/platforms/notion/client';
import fullIcon from '@/platforms/notion/logos/full';
import boxIcon from '@/platforms/notion/logos/box';
import { auth, platform } from '@/sdk';

export default platform('notion', {
  auth: auth.oauth2({
   authUrl: "https://api.notion.com/v1/oauth/authorize",
   tokenUrl: "https://api.notion.com/v1/oauth/token",
   tokenAuth: 'header',
   oauthBodyFormat: 'json',
   authParams: {
      "owner": "user"
}
    }),
  display: {
    name: 'Notion',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#111111',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
