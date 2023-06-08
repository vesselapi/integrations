import { transformProperty } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';
import { hubspotModuleSchema } from '../../schemas';

export default action(
  'list-properties',
  {
    operation: 'list',
    resource: 'properties',
    mutation: false,
    schema: z.object({
      objectType: hubspotModuleSchema,
    }),
    scopes: [
      'crm.schemas.companies.read',
      'crm.schemas.contacts.read',
      'crm.schemas.deals.read',
    ],
  },
  async ({ auth, input }) => {
    const result = await client.properties.list(auth, input);

    return {
      results: result.data.results?.map(transformProperty),
      $native: result.$native,
    };
  },
);
