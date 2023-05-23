import { transformCompany } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';
import { hubspotCommonAssociationsSchema } from '../../schemas';

export default action(
  'find-company',
  {
    operation: 'find',
    resource: 'companies',
    mutation: false,
    schema: z.object({
      id: z.string(),
      associations: z.array(hubspotCommonAssociationsSchema).optional(),
    }),
    scopes: ['crm.objects.companies.read'],
  },
  async ({ auth, input }) => {
    const result = await client.companies.find(auth, {
      id: input.id,
    });

    return {
      ...transformCompany(result.data),
      $native: result.$native,
    };
  },
);
