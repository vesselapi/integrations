import { client } from '@/platforms/atlassian/client';
import boxIcon from '@/platforms/atlassian/logos/box';
import fullIcon from '@/platforms/atlassian/logos/full';
import { auth, platform } from '@/sdk';

export default platform('atlassian', {
  auth: auth.oauth2({
    authUrl: 'https://auth.atlassian.com/authorize',
    tokenUrl: 'https://auth.atlassian.com/oauth/token',
    requiredScopes: ['offline_access'],
    authParams: {
      audience: 'api.atlassian.com',
      prompt: 'consent',
    },
  }),
  display: {
    name: 'Atlassian',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#0052cc',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
