import { transformMeeting } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'meetings-update',
  {
    operation: 'update',
    resource: 'meetings',
    mutation: true,
    schema: z
      .object({
        hsTimestamp: z.string(),
        hsMeetingTitle: z.string(),
        hsMeetingBody: z.string(),
        hsMeetingLocation: z.string(),
        hsMeetingStartTime: z.string(),
        hsMeetingEndTime: z.string(),
        hubspotOwnerId: z.string(),
      })
      .partial()
      .extend({
        id: z.string(),
      }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.meetings.update(auth, {
      id: input.id,
      hs_timestamp: input.hsTimestamp,
      hs_meeting_title: input.hsMeetingTitle,
      hs_meeting_body: input.hsMeetingBody,
      hs_meeting_location: input.hsMeetingLocation,
      hs_meeting_start_time: input.hsMeetingStartTime,
      hs_meeting_end_time: input.hsMeetingEndTime,
      hubspot_owner_id: input.hubspotOwnerId,
    });

    return {
      ...transformMeeting(result.data),
      $native: result.$native,
    };
  },
);
