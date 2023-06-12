import { outreachUrl } from '@/platforms/outreach/actions/validators';
import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-prospects',
  {
    operation: 'list',
    resource: 'prospects',
    mutation: false,
    schema: z.object({
      filters: z
        .object({
          emails: z.string(), // comma separated list: email1,email2,email3
          tags: z.string(), // comma separated list: tag1,tag2,tag3
          sequenceIds: z.string(), // comma separated list: id1,id2,id3
        })
        .optional(),
      cursor: outreachUrl().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.prospects.list(auth, {
      cursor: input.cursor,
      filters: input.filters,
    });
  },
);
