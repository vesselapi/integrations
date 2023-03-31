import { action } from '@/sdk';
import client from '../../client';
import { dialpadCallStartSchema } from '../../schemas';

export default action(
  'start-call',
  {
    operation: 'start',
    resource: 'calls',
    mutation: true,
    schema: dialpadCallStartSchema,
    scopes: [],
  },
  ({ auth, input }) => client.calls.start(auth, input),
);
