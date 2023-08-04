import listConversations from '@/platforms/slack/actions/conversations/list';
import createMessage from '@/platforms/slack/actions/messages/create';
import updateMessage from '@/platforms/slack/actions/messages/update';
import listUsers from '@/platforms/slack/actions/users/list';
import { client } from '@/platforms/slack/client';
import * as constants from '@/platforms/slack/constants';
import fullIcon from '@/platforms/slack/logos/full';
import boxIcon from '@/platforms/slack/logos/box';
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
    logos: {
        defaultURI: fullIcon ?? boxIcon,
        fullURI: fullIcon,
        boxURI: boxIcon,
    },
    colors: {
        primary: '#611f69',
    },
    categories: ["chat"],
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
