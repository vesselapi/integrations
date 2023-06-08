import { transformContact } from '@/platforms/aircall/actions/mappers';
import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'find-contact',
  {
    operation: 'find',
    resource: 'contacts',
    mutation: false,
    schema: z.object({
      id: z.number().or(z.string()),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.contacts.find(auth, { id: input.id });

    return {
      contact: transformContact(result.data.contact),
      $native: result.$native,
    };
  },
);
