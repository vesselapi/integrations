import { client } from '@/platforms/microsoft/client';
import * as constants from '@/platforms/microsoft/constants';
import boxIcon from '@/platforms/teams/logos/box';
import fullIcon from '@/platforms/teams/logos/full';
import { auth, platform } from '@/sdk';
import { add } from 'date-fns';
import { z } from 'zod';

import listChannels from '@/platforms/teams/actions/channels/list';
import listMembers from '@/platforms/teams/actions/members/list';
import createMessage from '@/platforms/teams/actions/messages/create';
import listTeams from '@/platforms/teams/actions/teams/list';

export * as types from '@/platforms/microsoft/schemas';

export default platform('teams', {
  auth: auth.oauth2({
    authUrl: ({ appMetadata }) =>
      `https://login.microsoftonline.com/${
        appMetadata.tenantId ?? 'common'
      }/oauth2/v2.0/authorize`,
    tokenUrl: ({ appMetadata }) =>
      `https://login.microsoftonline.com/${
        appMetadata.tenantId ?? 'common'
      }/oauth2/v2.0/token`,
    oauthBodyFormat: 'form',
    scopeSeparator: ',',
    default: true,
    appMetadataSchema: z.object({
      tenantId: z.string().uuid().optional(),
    }),
    accessTokenExpiresAt: () => add(Date.now(), { days: 1 }),
    refreshTokenExpiresAt: () => add(Date.now(), { days: 90 }),
  }),
  display: {
    name: 'Microsoft Teams',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#444cb7',
    },
    categories: ['chat'],
  },
  client,
  constants,
  actions: {
    createMessage,
    listChannels,
    listMembers,
    listTeams,
  },
});
