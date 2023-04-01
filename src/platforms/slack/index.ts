import { icon } from '@/platforms/slack/icon';
import { auth, platform } from '@/sdk';

export default platform('slack', {
  auth: auth.oauth2({
    authUrl: 'https://slack.com/oauth/authorize',
    tokenUrl: 'https://slack.com/api/oauth.access',
    oauthBodyFormat: 'form',
    scopeSeparator: ' ',
    default: true,
  }),
  display: {
    name: 'Slack',
    iconURI: icon,
  },
  client: {} as any,
  constants: {},
  actions: {},
});
