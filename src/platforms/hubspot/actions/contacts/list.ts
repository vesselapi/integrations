import { transformContact } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';
import { hubspotCommonAssociationsSchema } from '../../schemas';

export default action(
  'list-contacts',
  {
    operation: 'list',
    resource: 'contacts',
    mutation: false,
    schema: z.object({
      after: z.string().optional(),
      pageSize: z.number().optional(),
      associations: z.array(hubspotCommonAssociationsSchema).optional(),
    }),
    scopes: ['crm.objects.contacts.read'],
  },
  async ({ auth, input }) => {
    const result = await client.contacts.list(auth, input);

    return {
      paging: result.data.paging,
      results: result.data.results?.map(transformContact),
      $native: result.$native,
    };
  },
);
