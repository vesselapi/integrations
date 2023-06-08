import { transformNote } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';
import { hubspotCommonAssociationsSchema } from '../../schemas';

export default action(
  'find-note',
  {
    operation: 'find',
    resource: 'notes',
    mutation: false,
    schema: z.object({
      id: z.string(),
      associations: z.array(hubspotCommonAssociationsSchema).optional(),
    }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.notes.find(auth, {
      id: input.id,
    });

    return {
      ...transformNote(result.data),
      $native: result.$native,
    };
  },
);
