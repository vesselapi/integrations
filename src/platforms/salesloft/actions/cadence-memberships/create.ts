import { transformCadenceMembership } from '@/platforms/salesloft/actions/mappers';
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
      cadenceId: z.string(),
      personId: z.string(),
      userId: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.cadenceMemberships.create(auth, {
      cadence_id: input.cadenceId,
      person_id: input.personId,
      user_id: input.userId,
    });

    return {
      data: transformCadenceMembership(result.data.data),
      $native: result.$native,
    };
  },
);
