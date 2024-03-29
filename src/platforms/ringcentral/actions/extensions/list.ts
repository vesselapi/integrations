import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'list-extensions',
  {
    operation: 'list',
    resource: 'extensions',
    mutation: false,
    schema: z.object({
      page: z.number().optional(),
      perPage: z.number().optional(),
    }),
    scopes: ['ReadAccounts'],
  },
  ({ auth, input }) => client.extensions.list(auth, input),
);
