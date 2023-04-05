import { client } from '@/platforms/mailchimp/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import * as z from 'zod';
import { mailchimpMember } from '../../schemas';

export default action(
  'create-member',
  {
    operation: 'create',
    resource: 'members',
    mutation: true,
    schema: custom.object({
      list_id: z.string(),
      member: mailchimpMember
        .partial()
        .required({
          email_address: true,
          status: true,
        })
        .omit({
          id: true,
        }),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.members.create(auth, input);
  },
);
