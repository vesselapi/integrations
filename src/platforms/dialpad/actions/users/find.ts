import { z } from 'zod';
import { action } from '../../../../sdk';
import client from '../../client';

export default action(
  'users-find',
  {
    resource: 'user',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [],
  },
  ({ auth, input }) => client.users.find(auth, input),
);
