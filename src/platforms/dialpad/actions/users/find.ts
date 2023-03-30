import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'find-users',
  {
    operation: 'find',
    resource: 'users',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [],
  },
  ({ auth, input }) =>
    client.users.find(auth, {
      id: input.id,
    }),
);
