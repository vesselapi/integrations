import {
  transformMetadata,
  transformPerson,
} from '@/platforms/salesloft/actions/mappers';
import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-people',
  {
    operation: 'list',
    resource: 'people',
    mutation: true,
    schema: z.object({
      email_addresses: z.array(z.string()).optional(),
      perPage: z.number().optional(),
      page: z.number().optional(),
      tag_id: z.string().optional(), // tag id to filter by
      cadence_id: z.string().optional(), // cadence id to filter by
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.people.list(auth, {
      per_page: input.perPage,
      page: input.page,
      email_addresses: input.email_addresses,
      tag_id: input.tag_id,
      cadence_id: input.cadence_id,
    });

    return {
      data: {
        data: result.data.data.map(transformPerson),
        metadata: transformMetadata(result.data.metadata),
      },
      $native: result.$native,
    };
  },
);
