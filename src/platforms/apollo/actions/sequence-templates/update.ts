import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'update-sequence-templates',
  {
    operation: 'update',
    resource: 'sequence-templates',
    mutation: true,
    schema: z.object({
      id: z.string(),
      emailerTemplate: z.object({
        name: z.string().optional(),
        userId: z.string().optional(),
        subject: z.string().optional(),
        global: z.boolean().optional(),
        bodyHtml: z.string().optional(),
        bodyText: z.string().optional(),
        creationType: z.string().optional(),
        labelIds: z.array(z.string()).optional(),
      }),
      emailerStepId: z.string(),
      emailerTemplateId: z.string().optional(),
      status: z.string().optional(),
      type: z.string().optional(),
      includeSignature: z.boolean().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.sequenceTemplates.update(auth, {
      id: input.id,
      emailer_template: {
        name: input.emailerTemplate.name,
        user_id: input.emailerTemplate.userId,
        subject: input.emailerTemplate.subject,
        global: input.emailerTemplate.global,
        body_html: input.emailerTemplate.bodyHtml,
        body_text: input.emailerTemplate.bodyText,
        creation_type: input.emailerTemplate.creationType,
        label_ids: input.emailerTemplate.labelIds,
      },
      emailer_step_id: input.emailerStepId,
      emailer_template_id: input.emailerTemplateId,
      status: input.status,
      type: input.type,
      include_signature: input.includeSignature,
    });

    return {
      emailerTouch: result.data.emailer_touch,
      $native: result.$native,
    };
  },
);
