import { client } from '@/platforms/apollo/client';
import { apolloUpdateSequenceTemplate } from '@/platforms/apollo/schemas';
import { action } from '@/sdk';

export default action(
  'update-sequence-templates',
  {
    operation: 'update',
    resource: 'sequence-templates',
    mutation: true,
    schema: apolloUpdateSequenceTemplate,
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.sequenceTemplates.update(auth, input);
  },
);
