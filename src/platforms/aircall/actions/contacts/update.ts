import * as custom from '@/sdk/validators';
import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'update-contact',
  {
    operation: 'update',
    resource: 'contacts',
    mutation: true,
    schema: custom.object({
      id: z.number().or(z.string()),
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
