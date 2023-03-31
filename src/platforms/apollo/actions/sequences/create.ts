import { action } from '../../../../sdk';
import { client } from '../../client';
import { apolloCreateSequence } from '../../schemas';

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
    return await client.sequences.create(auth, {
      creation_type: input.creation_type,
      name: input.name,
      permissions: input.permissions,
      active: input.active,
      type: input.type,
    });
  },
);
