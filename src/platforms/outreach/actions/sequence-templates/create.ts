import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'create-sequence-template',
  {
    operation: 'create',
    resource: 'sequence-templates',
    mutation: true,
    schema: custom.object({
      attributes: custom.object({
        isReply: z.boolean(),
      }),
      relationships: custom.object({
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
