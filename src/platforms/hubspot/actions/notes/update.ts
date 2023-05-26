import { transformNote } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'notes-update',
  {
    operation: 'update',
    resource: 'notes',
    mutation: true,
    schema: z
      .object({
        hubspotOwnerId: z.string(),
        hsNoteBody: z.string(),
      })
      .partial()
      .extend({
        id: z.string(),
      }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.notes.update(auth, {
      id: input.id,
      hubspot_owner_id: input.hubspotOwnerId,
      hs_note_body: input.hsNoteBody,
    });

    return {
      ...transformNote(result.data),
      $native: result.$native,
    };
  },
);
