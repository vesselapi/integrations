import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';
import client from '../../client';

export default action(
  'list-calls',
  {
    operation: 'list',
    resource: 'calls',
    mutation: false,
    schema: custom.object({
      cursor: z.string().optional(),
    }),
    scopes: [],
  },
  ({ auth, input }) => client.calls.list(auth, input),
);
