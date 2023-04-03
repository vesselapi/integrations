import { client } from '@/platforms/apollo/client';
import { apolloCreateSequenceStep } from '@/platforms/apollo/schemas';
import { action } from '@/sdk';

export default action(
  'create-sequence-steps',
  {
    operation: 'create',
    resource: 'sequence-steps',
    mutation: true,
    schema: apolloCreateSequenceStep,
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.sequenceSteps.create(auth, input);
  },
);
