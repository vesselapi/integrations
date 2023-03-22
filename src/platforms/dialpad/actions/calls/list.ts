import { z } from 'zod';
import { action } from '../../../../sdk';
import client from '../../client';

export default action(
  'calls-list',
  {
    resource: 'call',
    mutation: false,
    schema: z.object({
      page: z.number().optional(),
      per_page: z.number().optional(),
    }),
    scopes: [],
  },
  ({ auth, input }) => client.calls.list(auth, input),
);
