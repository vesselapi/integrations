import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'create-sequence-state',
  {
    operation: 'create',
    resource: 'sequence-states',
    mutation: true,
    schema: custom.object({
      relationships: custom.object({
        prospectId: z.number(),
        sequenceId: z.number(),
        mailboxId: z.number(),
      }),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.sequenceStates.create(auth, {
      relationships: {
        prospect: {
          data: { id: input.relationships.prospectId, type: 'prospect' },
        },
        sequence: {
          data: { id: input.relationships.sequenceId, type: 'sequence' },
        },
        mailbox: {
          data: { id: input.relationships.mailboxId, type: 'mailbox' },
        },
      },
    });
  },
);
