import { client } from '@/platforms/teamwork/client';
import fullIcon from '@/platforms/teamwork/logos/full';
import boxIcon from '@/platforms/teamwork/logos/box';
import { auth, platform } from '@/sdk';

export default platform('teamwork', {
  auth: auth.oauth2({
   authUrl: "https://www.teamwork.com/launchpad/login",
   tokenUrl: "https://www.teamwork.com/launchpad/v1/token.json",
   questions: [{"id":"subdomain","label":"What is your Teamworks Subdomain?","type":"text"}]
    }),
  display: {
    name: 'Teamwork',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#FF22B1',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
