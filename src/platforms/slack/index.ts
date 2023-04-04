import listConversations from '@/platforms/slack/actions/conversations/list';
import createMessage from '@/platforms/slack/actions/messages/create';
import updateMessage from '@/platforms/slack/actions/messages/update';
import listUsers from '@/platforms/slack/actions/users/list';
import { client } from '@/platforms/slack/client';
import * as constants from '@/platforms/slack/constants';
import { icon } from '@/platforms/slack/icon';
import { auth, platform } from '@/sdk';

export * as types from '@/platforms/slack/schemas';

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
    categories: ['chat'],
  },
  client,
  constants,
  actions: {
    createMessage,
    updateMessage,
    listUsers,
    listConversations,
  },
});
