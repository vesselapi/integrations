import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

import { transformAssociation } from '@/platforms/hubspot/actions/mappers';
import { HUBSPOT_DEFINED_CATEGORY } from '../../constants';
import { hubspotModuleSchema } from '../../schemas';

export default action(
  'associations-create',
  {
    operation: 'create',
    resource: 'associations',
    mutation: true,
    schema: z.object({
      fromId: z.string(),
      fromType: hubspotModuleSchema,
      toId: z.string(),
      toType: hubspotModuleSchema,
      category: z.string().optional(),
      typeId: z.string().optional(),
    }),
    scopes: [
      'crm.schemas.companies.write',
      'crm.schemas.contacts.write',
      'crm.schemas.deals.write',
    ],
  },
  async ({ auth, input }) => {
    const { category, typeId } = await (async () => {
      if (input.category && input.typeId) return input;
      const labelsResponse = await client.associations.labels(auth, {
        fromType: input.fromType,
        toType: input.toType,
      });
      const associationTypeId = labelsResponse.data.results?.find(
        (id) => id.category === HUBSPOT_DEFINED_CATEGORY,
      )?.typeId;
      return {
        category: HUBSPOT_DEFINED_CATEGORY,
        typeId: associationTypeId,
      };
    })();
    const result = await client.associations.create(auth, {
      fromId: input.fromId,
      fromType: input.fromType,
      toId: input.toId,
      toType: input.toType,
      category,
      typeId,
    });

    return {
      results: result.data.results?.map(transformAssociation),
      $native: result.$native,
    };
  },
);
