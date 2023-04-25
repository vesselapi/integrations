import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

import { transformProperty } from '@/platforms/hubspot/actions/mappers';
import {
  hubspotModuleSchema,
  hubspotPropertyFieldTypeSchema,
  hubspotPropertyOptionSchema,
  hubspotPropertyTypeSchema,
} from '../../schemas';

export default action(
  'properties-create',
  {
    operation: 'create',
    resource: 'properties',
    mutation: true,
    schema: z.object({
      objectType: hubspotModuleSchema,
      name: z.string(),
      label: z.string(),
      type: hubspotPropertyTypeSchema,
      fieldType: hubspotPropertyFieldTypeSchema,
      groupName: z.string(),
      options: z.array(hubspotPropertyOptionSchema).optional(),
    }),
    scopes: [
      'crm.schemas.companies.write',
      'crm.schemas.contacts.write',
      'crm.schemas.deals.write',
    ],
  },
  async ({ auth, input }) => {
    const result = await client.properties.create(auth, {
      objectType: input.objectType,
      property: {
        name: input.name,
        label: input.label,
        type: input.type,
        fieldType: input.fieldType,
        groupName: input.groupName,
        options: input.options,
      },
    });

    return {
      ...transformProperty(result.data),
      $native: result.$native,
    };
  },
);
