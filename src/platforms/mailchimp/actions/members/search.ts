import { client } from '@/platforms/mailchimp/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import * as z from 'zod';

export default action(
  'search-members',
  {
    operation: 'search',
    resource: 'members',
    mutation: false,
    schema: custom.object({
      list_id: z.string().optional(),
      fields: z.array(z.string()).optional(),
      exclude_fields: z.array(z.string()).optional(),
      query: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.members.search(auth, input);
  },
);
