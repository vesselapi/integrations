import { client } from '@/platforms/mailchimp/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import * as z from 'zod';

export default action(
  'update-member',
  {
    operation: 'update',
    resource: 'members',
    mutation: true,
    schema: z.object({
      listId: z.string(),
      member: z.object({
        id: z.string(),
        emailAddress: z.string(),
        fullName: z.string().optional(),
        status: z.string(),
        lastChanged: custom.date().optional(),
        timestampSignup: custom.date().optional(),
      }),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.members.update(auth, {
      list_id: input.listId,
      subscriber_hash: input.member.id,
      member: {
        email_address: input.member.emailAddress,
        full_name: input.member.fullName,
        status: input.member.status,
        last_changed: input.member.lastChanged,
        timestamp_signup: input.member.timestampSignup,
      },
    });
  },
);
