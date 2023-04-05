import { client } from '@/platforms/mailchimp/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import * as z from 'zod';
import { mailchimpMember } from '../../schemas';

export default action(
  'update-member',
  {
    operation: 'update',
    resource: 'members',
    mutation: true,
    schema: custom.object({
      list_id: z.string(),
      member: mailchimpMember.partial().required({
        id: true,
        email_address: true,
        status: true,
      }),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.members.update(auth, {
      list_id: input.list_id,
      subscriber_hash: input.member.id,
      member: input.member,
    });
  },
);
