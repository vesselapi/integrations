import { transformOwner } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'list-owners',
  {
    operation: 'list',
    resource: 'owners',
    mutation: false,
    schema: z.object({
      after: z.string().optional(),
      pageSize: z.number().optional(),
    }),
    scopes: ['crm.objects.owners.read'],
  },
  async ({ auth, input }) => {
    const result = await client.owners.list(auth, input);
    return {
      paging: result.data.paging,
      results: result.data.results?.map(transformOwner),
      $native: result.$native,
    };
  },
);
