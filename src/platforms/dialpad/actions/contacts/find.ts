import { transformContact } from '@/platforms/dialpad/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'find-contact',
  {
    operation: 'find',
    resource: 'contacts',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.contacts.find(auth, {
      id: input.id,
    });

    return {
      ...transformContact(result.data),
      $native: result.$native,
    };
  },
);
