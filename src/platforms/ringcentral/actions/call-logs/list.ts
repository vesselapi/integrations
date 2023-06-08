import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'list-call-logs',
  {
    operation: 'list',
    resource: 'call-logs',
    mutation: false,
    schema: z.object({
      page: z.number().optional(),
      perPage: z.number().optional(),
    }),
    scopes: ['ReadCallLog'],
  },
  ({ auth, input }) => client.callLogs.list(auth, input),
);
