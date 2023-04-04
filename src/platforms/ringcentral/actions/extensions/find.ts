import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';
import client from '../../client';

export default action(
  'find-extension',
  {
    operation: 'find',
    resource: 'extensions',
    mutation: false,
    schema: custom.object({
      id: z.string(),
    }),
    scopes: ['ReadAccounts'],
  },
  ({ auth, input }) => client.extensions.find(auth, input),
);
