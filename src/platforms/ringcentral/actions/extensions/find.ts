import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'find-extension',
  {
    operation: 'find',
    resource: 'extensions',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: ['ReadAccounts'],
  },
  ({ auth, input }) => client.extensions.find(auth, input),
);
