import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'calls-find',
  {
    resource: 'calls',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [],
  },
  ({ auth, input }) =>
    client.calls.find(auth, {
      id: input.id,
    }),
);
