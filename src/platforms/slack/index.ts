import listConversations from '@/platforms/slack/actions/conversations/list';
import createMessage from '@/platforms/slack/actions/messages/create';
import updateMessage from '@/platforms/slack/actions/messages/update';
import listUsers from '@/platforms/slack/actions/users/list';
import { client } from '@/platforms/slack/client';
import * as constants from '@/platforms/slack/constants';
import { icon } from '@/platforms/slack/icon';
import { slackExpiredAuth } from '@/platforms/slack/schemas';
import { auth, platform } from '@/sdk';

export * as types from '@/platforms/slack/schemas';

export default platform('slack', {
  auth: auth.oauth2({
    authUrl: 'https://slack.com/oauth/v2/authorize',
    tokenUrl: 'https://slack.com/api/oauth.v2.access',
    oauthBodyFormat: 'form',
    scopeSeparator: ',',
    default: true,
    isRetryable: async ({ json }) => {
      const zodResult = slackExpiredAuth.safeParse(json());
      return zodResult.success;
    },
  }),
  display: {
    name: 'Slack',
    iconURI: icon,
    logos: {
      defaultURI: icon,
    },
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
