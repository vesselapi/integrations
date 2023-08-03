import { client } from '@/platforms/jira/client';
import boxIcon from '@/platforms/jira/logos/box';
import fullIcon from '@/platforms/jira/logos/full';
import { auth, platform } from '@/sdk';

export default platform('jira', {
  auth: auth.oauth2({
    authUrl: 'https://auth.atlassian.com/authorize',
    tokenUrl: 'https://auth.atlassian.com/oauth/token',
    authParams: {
      audience: 'api.atlassian.com',
      prompt: 'consent',
    },
  }),
  display: {
    name: 'Jira',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#2684ff',
    },
    categories: ['ticketing'],
  },
  client,
  constants: {},
  actions: {},
});
