import { transformCompany } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';
import { hubspotCommonAssociationsSchema } from '../../schemas';

export default action(
  'list-companies',
  {
    operation: 'list',
    resource: 'companies',
    mutation: false,
    schema: z.object({
      after: z.string().optional(),
      pageSize: z.number().optional(),
      associations: z.array(hubspotCommonAssociationsSchema).optional(),
    }),
    scopes: ['crm.objects.companies.read'],
  },
  async ({ auth, input }) => {
    const result = await client.companies.list(auth, input);

    return {
      paging: result.data.paging,
      results: result.data.results?.map(transformCompany),
      $native: result.$native,
    };
  },
);
