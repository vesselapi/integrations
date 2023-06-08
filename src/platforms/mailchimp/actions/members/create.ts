import { client } from '@/platforms/mailchimp/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import * as z from 'zod';

export default action(
  'create-member',
  {
    operation: 'create',
    resource: 'members',
    mutation: true,
    schema: z.object({
      listId: z.string(),
      member: z.object({
        emailAddress: z.string(),
        fullName: z.string(),
        status: z.string(),
        lastChanged: custom.date(),
        timestampSignup: custom.date(),
      }),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.members.create(auth, {
      list_id: input.listId,
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
