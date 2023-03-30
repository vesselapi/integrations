import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'list-calls',
  {
    operation: 'list',
    resource: 'calls',
    mutation: false,
    schema: z.object({
      cursor: z.string().optional(),
    }),
    scopes: [],
  },
  ({ auth, input }) => client.calls.list(auth, input),
);
