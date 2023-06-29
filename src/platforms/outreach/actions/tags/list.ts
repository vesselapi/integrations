import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import { z } from 'zod';

/**
 * @WARN THIS IS AN EXPERIMENTAL ACTION
 *
 * Outreach does not support a native "list tags" endpoint but tags are
 * often needed for filtering lists of prospects. This action reverse
 * engineers a few of the APIs used internally by the Outreach UI to
 * get a list of tags.
 *
 * We'll be deleting this endpoint once Outreach has better
 * support for listing tags.
 */
export default action(
  'list-tags',
  {
    operation: 'list-experimental',
    resource: 'tags',
    mutation: false,
    schema: z.object({
      // The domain prefix of the graphQL query
      prefix: z.string().optional(),
      offset: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const tags = (await client.graphQl(auth, {
      prefix: input.prefix,
      query:
        'query GetTagCollection {\n tagCollection {\n count\n collection {\n id\n name\n }\n }\n}',
      resource: 'ContentManagers_ProspectAutocomplete',
      variables: {
        query: '',
        limit: 50,
        offset: input.offset ?? 0,
      },
    })) as unknown as {
      data: {
        tagCollection: {
          count: number;
          collection: {
            id: string;
            name: string;
          }[];
        };
      };
    };

    console.log(tags);
    return tags.data?.tagCollection;
  },
);
