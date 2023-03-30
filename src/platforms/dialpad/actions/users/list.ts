import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'users-list',
  {
    resource: 'users',
    mutation: false,
    schema: z.object({
      page: z.number().optional(),
      per_page: z.number().optional(),
    }),
    scopes: [],
  },
  ({ auth, input }) => client.users.list(auth, input),
);
