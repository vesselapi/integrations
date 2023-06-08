import {
  transformEmail,
  transformMetadata,
} from '@/platforms/salesloft/actions/mappers';
import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-emails',
  {
    operation: 'list',
    resource: 'emails',
    mutation: true,
    schema: z.object({
      perPage: z.number().optional(),
      page: z.number().optional(),
      personId: z.string().optional(),
      cadenceId: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.emails.list(auth, {
      per_page: input.perPage,
      page: input.page,
      person_id: input.personId,
      cadence_id: input.cadenceId,
    });

    return {
      data: {
        data: result.data.data.map(transformEmail),
        metadata: transformMetadata(result.data.metadata),
      },
      $native: result.$native,
    };
  },
);
