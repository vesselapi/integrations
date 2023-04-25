import { transformContactList } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { shake } from 'radash';
import { z } from 'zod';
import client from '../../client';

export default action(
  'list-contact-lists',
  {
    operation: 'list',
    resource: 'contact-lists',
    mutation: false,
    schema: z.object({
      count: z.number().optional(),
      offset: z.number().optional(),
    }),
    scopes: ['crm.lists.read'],
  },
  async ({ auth, input }) => {
    const result = await client.contactLists.list(auth, input);

    return {
      paging: shake({
        hasMore: result.data['has-more'],
        offset: result.data.offset,
      }),
      results: result.data.lists?.map(transformContactList),
      $native: result.$native,
    };
  },
);
