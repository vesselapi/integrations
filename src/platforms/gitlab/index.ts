import { client } from '@/platforms/gitlab/client';
import fullIcon from '@/platforms/gitlab/logos/full';
import boxIcon from '@/platforms/gitlab/logos/box';
import { auth, platform } from '@/sdk';

export default platform('gitlab', {
  auth: auth.oauth2({
   authUrl: "https://gitlab.com/oauth/authorize",
   tokenUrl: "https://gitlab.com/oauth/token",
   questions: [{"id":"subdomain","label":"What is your Gitlab Subdomain?","type":"text"}]
    }),
  display: {
    name: 'Gitlab',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#e24329',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
