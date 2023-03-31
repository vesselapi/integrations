import { action } from '@/sdk';
import client from '../../client';
import { ringcentralRingOutStartSchema } from '../../schemas';

export default action(
  'extension-ring-out',
  {
    operation: 'ring-out',
    resource: 'extensions',
    mutation: true,
    schema: ringcentralRingOutStartSchema,
    scopes: ['RingOut'],
  },
  ({ auth, input }) => client.extensions.ringout(auth, input),
);
