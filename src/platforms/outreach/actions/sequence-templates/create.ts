import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'create-sequence-template',
  {
    operation: 'create',
    resource: 'sequence-templates',
    mutation: true,
    schema: z.object({
      attributes: z.object({
        isReply: z.boolean(),
      }),
      relationships: z.object({
        sequenceStepId: z.number(),
        templateId: z.number(),
      }),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.sequenceTemplates.create(auth, {
      attributes: input.attributes,
      relationships: {
        sequenceStep: {
          data: {
            id: input.relationships.sequenceStepId,
            type: 'sequenceStep',
          },
        },
        template: {
          data: { id: input.relationships.templateId, type: 'template' },
        },
      },
    });
  },
);
