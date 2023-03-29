import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'contacts-update',
  {
    resource: 'contact',
    mutation: true,
    schema: z.object({
      id: z.string(),
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      company_name: z.string().optional(),
      information: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.contacts.update(auth, {
      id: input.id,
      first_name: input.first_name,
      last_name: input.last_name,
      company_name: input.company_name,
      information: input.information,
    });
  },
);
