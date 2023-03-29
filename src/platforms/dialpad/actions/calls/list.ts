import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'calls-list',
  {
    resource: 'calls',
    mutation: false,
    schema: z.object({
      page: z.number().optional(),
      per_page: z.number().optional(),
    }),
    scopes: [],
  },
  ({ auth, input }) => client.calls.list(auth, input),
);
