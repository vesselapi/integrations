import { transformSequence } from '@/platforms/apollo/actions/mappers';
import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'create-sequences',
  {
    operation: 'create',
    resource: 'sequences',
    mutation: true,
    schema: z.object({
      creationType: z.string().optional(),
      name: z.string().optional(),
      permissions: z.string(),
      type: z.string().optional(),
      active: z.boolean().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.sequences.create(auth, {
      creation_type: input.creationType,
      name: input.name,
      permissions: input.permissions,
      type: input.type,
      active: input.active,
    });

    return {
      emailerCampaign: transformSequence(result.data.emailer_campaign),
      $native: result.$native,
    };
  },
);
