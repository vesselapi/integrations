import createChat from '@/platforms/slack/actions/chats/create';
import updateChat from '@/platforms/slack/actions/chats/update';
import listConversations from '@/platforms/slack/actions/conversations/list';
import listUsers from '@/platforms/slack/actions/users/list';
import { client } from '@/platforms/slack/client';
import * as constants from '@/platforms/slack/constants';
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
  client,
  constants,
  actions: {
    createChat,
    updateChat,
    listUsers,
    listConversations,
  },
});
