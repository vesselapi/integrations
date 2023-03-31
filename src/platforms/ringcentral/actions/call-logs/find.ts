import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'find-call-log',
  {
    operation: 'find',
    resource: 'call-logs',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: ['ReadCallLog'],
  },
  ({ auth, input }) => client.callLogs.find(auth, input),
);
