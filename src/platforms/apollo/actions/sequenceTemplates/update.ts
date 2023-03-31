import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';
import { apolloCreateSequenceTemplate } from '../../schemas';

export default action(
  'update-sequence-templates',
  {
    operation: 'update',
    resource: 'sequence-templates',
    mutation: true,
    schema: apolloCreateSequenceTemplate.extend({ id: z.string() }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.sequenceTemplate.update(auth, {
      id: input.id,
      emailer_step_id: input.emailer_step_id,
      emailer_template_id: input.emailer_template_id,
      status: input.status,
      type: input.type,
      include_signature: input.include_signature,
      emailer_template: input.emailer_template,
    });
  },
);
