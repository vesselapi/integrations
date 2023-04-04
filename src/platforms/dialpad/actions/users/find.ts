import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';
import client from '../../client';

export default action(
  'find-user',
  {
    operation: 'find',
    resource: 'users',
    mutation: false,
    schema: custom.object({
      id: z.string(),
    }),
    scopes: [],
  },
  ({ auth, input }) =>
    client.users.find(auth, {
      id: input.id,
    }),
);
