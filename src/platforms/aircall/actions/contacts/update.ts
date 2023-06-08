import { transformContact } from '@/platforms/aircall/actions/mappers';
import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'update-contact',
  {
    operation: 'update',
    resource: 'contacts',
    mutation: true,
    schema: z.object({
      id: z.number().or(z.string()),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      companyName: z.string().optional(),
      information: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.contacts.update(auth, {
      id: input.id,
      first_name: input.firstName,
      last_name: input.lastName,
      company_name: input.companyName,
      information: input.information,
    });

    return {
      contact: transformContact(result.data.contact),
      $native: result.$native,
    };
  },
);
