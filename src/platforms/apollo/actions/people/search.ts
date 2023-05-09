import {
  transformContact,
  transformPagination,
  transformPerson,
} from '@/platforms/apollo/actions/mappers';
import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'search-people',
  {
    operation: 'search',
    resource: 'people',
    mutation: false,
    schema: z.object({
      qKeywords: z.string().optional(),
      page: z.number().optional(),
      labelIds: z.array(z.string()).optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.people.search(auth, {
      q_keywords: input.qKeywords,
      page: input.page,
      contact_label_ids: input.labelIds,
    });

    return {
      people: result.data.people.map(transformPerson),
      contacts: result.data.contacts.map(transformContact),
      pagination: transformPagination(result.data.pagination),
      $native: result.$native,
    };
  },
);
