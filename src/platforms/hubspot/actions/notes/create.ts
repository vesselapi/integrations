import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

import { transformNote } from '@/platforms/hubspot/actions/mappers';

export default action(
  'notes-create',
  {
    operation: 'create',
    resource: 'notes',
    mutation: true,
    schema: z.object({
      hubspotOwnerId: z.string(),
      hsNoteBody: z.string(),
    }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.notes.create(auth, {
      hubspot_owner_id: input.hubspotOwnerId,
      hs_note_body: input.hsNoteBody,
    });

    return {
      ...transformNote(result.data),
      $native: result.$native,
    };
  },
);
