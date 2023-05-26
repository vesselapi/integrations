import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

import { transformCompany } from '@/platforms/hubspot/actions/mappers';
import * as custom from '@/sdk/validators';

export default action(
  'companies-create',
  {
    operation: 'create',
    resource: 'companies',
    mutation: true,
    schema: z.object({
      name: z.string(),
      website: z.string(),
      industry: z.string(),
      address: z.string(),
      city: z.string(),
      state: z.string(),
      zip: z.string(),
      country: z.string(),
      numberOfEmployees: z.string(),
      annualRevenue: z.string(),
      description: z.string(),
      phone: custom.formattedPhoneNumber(),
      hubspotOwnerId: z.string(),
    }),
    scopes: ['crm.objects.companies.write'],
  },
  async ({ auth, input }) => {
    const result = await client.companies.create(auth, {
      name: input.name,
      website: input.website,
      industry: input.industry,
      address: input.address,
      city: input.city,
      state: input.state,
      zip: input.zip,
      country: input.country,
      numberofemployees: input.numberOfEmployees,
      annualrevenue: input.annualRevenue,
      description: input.description,
      phone: input.phone,
      hubspot_owner_id: input.hubspotOwnerId,
    });

    return {
      ...transformCompany(result.data),
      $native: result.$native,
    };
  },
);
