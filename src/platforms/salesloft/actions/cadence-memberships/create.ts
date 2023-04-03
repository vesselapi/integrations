import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'create-cadence-memberships',
  {
    operation: 'create',
    resource: 'cadence-memberships',
    mutation: true,
    schema: z.object({
      cadence_id: z.string(),
      person_id: z.string(),
      user_id: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.cadenceMemberships.create(auth, input);
  },
);
