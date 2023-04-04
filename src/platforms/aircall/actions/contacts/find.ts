import * as custom from '@/sdk/validators';
import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'find-contact',
  {
    operation: 'find',
    resource: 'contacts',
    mutation: false,
    schema: custom.object({
      id: z.number().or(z.string()),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.contacts.find(auth, { id: input.id });
  },
);
