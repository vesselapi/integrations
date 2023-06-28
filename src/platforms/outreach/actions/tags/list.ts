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
    operation: 'list_experimental',
    resource: 'tags',
    mutation: false,
    schema: z.object({}),
    scopes: [],
  },
  async ({ input, auth }) => {
    // Fetch the datacenter
    console.log('Fetching datacenter');
    const user = await client.users.profile(auth, {});
    console.log(user);

    const dcUrl = user.data.urls.app_endpoint as `https://${string}`;
    console.log('fetch tags');
    const tags = await client.tags.list(auth, {
      url: `${dcUrl}/graphql/ContentManagers_ProspectAutocomplete`,
    });

    return tags.data?.data?.tagCollection?.collection;
  },
);
