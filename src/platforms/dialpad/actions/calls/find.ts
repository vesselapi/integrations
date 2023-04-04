import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';
import client from '../../client';

export default action(
  'find-call',
  {
    operation: 'find',
    resource: 'calls',
    mutation: false,
    schema: custom.object({
      id: z.string(),
    }),
    scopes: [],
  },
  ({ auth, input }) =>
    client.calls.find(auth, {
      id: input.id,
    }),
);
