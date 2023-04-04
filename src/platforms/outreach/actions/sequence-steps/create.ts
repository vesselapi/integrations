import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'create-sequence-step',
  {
    operation: 'create',
    resource: 'sequence-steps',
    mutation: true,
    schema: custom.object({
      attributes: custom.object({
        order: z.number().optional(),
        stepType: z.enum(['auto_email', 'manual_email', 'call', 'task']),
        interval: z.number().optional(),
      }),
      relationships: custom.object({
        sequenceId: z.number(),
      }),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.sequenceSteps.create(auth, {
      attributes: input.attributes,
      relationships: {
        sequence: {
          data: { id: input.relationships.sequenceId, type: 'sequence' },
        },
      },
    });
  },
);
