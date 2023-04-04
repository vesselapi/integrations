import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';
import client from '../../client';

export default action(
  'list-users',
  {
    operation: 'list',
    resource: 'users',
    mutation: false,
    schema: custom.object({
      cursor: z.string().optional(),
    }),
    scopes: [],
  },
  ({ auth, input }) => client.users.list(auth, input),
);
