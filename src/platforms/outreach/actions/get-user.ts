import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'get-user',
  {
    resource: 'users',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [
      'crm.objects.deals.write',
      'crm.objects.deals.read',
      'crm.schemas.deals.write',
      'crm.schemas.deals.read',
    ],
  },
  async ({ input, auth }) => {
    const result = await client.users.get(auth, { id: input.id });

    if (result.error) {
      return null;
    }
    // return await client.users.get(auth, { id: input.id });
  },
);
