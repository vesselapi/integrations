import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';
import client from '../../client';

export default action(
  'start-call',
  {
    operation: 'start',
    resource: 'calls',
    mutation: true,
    schema: z.object({
      customData: z.string().optional(),
      deviceId: z.string().optional(),
      groupId: z.number().optional(),
      groupType: z.string().optional(),
      outboundCallerId: z.string().optional(),
      phoneNumber: custom.formattedPhoneNumber(),
      userId: z.string(),
    }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.calls.start(auth, {
      custom_data: input.customData,
      device_id: input.deviceId,
      group_id: input.groupId,
      group_type: input.groupType,
      outbound_caller_id: input.outboundCallerId,
      phone_number: input.phoneNumber,
      user_id: input.userId,
    });

    return {
      callId: result.data.call_id,
      $native: result.$native,
    };
  },
);
