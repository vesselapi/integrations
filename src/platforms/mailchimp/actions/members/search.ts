import { transformMember } from '@/platforms/mailchimp/actions/mappers';
import { client } from '@/platforms/mailchimp/client';
import { action } from '@/sdk';
import * as z from 'zod';

export default action(
  'search-members',
  {
    operation: 'search',
    resource: 'members',
    mutation: false,
    schema: z.object({
      listId: z.string().optional(),
      fields: z.array(z.string()).optional(),
      excludeFields: z.array(z.string()).optional(),
      query: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.members.search(auth, {
      list_id: input.listId,
      fields: input.fields,
      exclude_fields: input.excludeFields,
      query: input.query,
    });

    return {
      exactMatches: {
        members: result.data.exact_matches.members.map(transformMember),
      },
      fullSearch: {
        members: result.data.full_search.members.map(transformMember),
      },
      $native: result.$native,
    };
  },
);
