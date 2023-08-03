import { client } from '@/platforms/todoist/client';
import boxIcon from '@/platforms/todoist/logos/box';
import { auth, platform } from '@/sdk';

export default platform('todoist', {
  auth: auth.oauth2({
   authUrl: "https://todoist.com/oauth/authorize",
   tokenUrl: "https://todoist.com/oauth/access_token",
   scopeSeparator: ','
    }),
  display: {
    name: 'Todoist',
    logos: {
     defaultURI: boxIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#de483a',
    },
    categories: ["ticketing"],
  },
  client,
  constants: {},
  actions: {},
});
