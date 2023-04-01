import { client } from '@/platforms/active-campaign/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-contacts',
  {
    operation: 'list',
    resource: 'contacts',
    mutation: false,
    schema: z.object({}),
    scopes: [],
  },
  async ({ auth }) => {
    return await client.contacts.list(auth, {});
  },
);
