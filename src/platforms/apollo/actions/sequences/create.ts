import { client } from '@/platforms/apollo/client';
import { apolloCreateSequence } from '@/platforms/apollo/schemas';
import { action } from '@/sdk';

export default action(
  'create-sequences',
  {
    operation: 'create',
    resource: 'sequences',
    mutation: true,
    schema: apolloCreateSequence,
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.sequences.create(auth, input);
  },
);
