import { client } from '@/platforms/confluence/client';
import defaultIcon from '@/platforms/defaultIcon';
import { auth, platform } from '@/sdk';

export default platform('confluence', {
  auth: auth.oauth2({
   authUrl: "https://auth.atlassian.com/authorize",
   tokenUrl: "https://auth.atlassian.com/oauth/token",
   questions: [{"id":"url","label":"What's your Confluence url?","type":"text"}],
   authParams: {
      "audience": "api.atlassian.com",
      "prompt": "consent"
}
    }),
  display: {
    name: 'Confluence',
    logos: {
     defaultURI: defaultIcon,
    },
    colors: {
      primary: '#003399',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
