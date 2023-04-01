import { client } from '@/platforms/active-campaign/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'create-contact',
  {
    operation: 'create',
    resource: 'contacts',
    mutation: true,
    schema: z.object({
      email: z.string(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      phone: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.contacts.create(auth, {
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
    });
  },
);
