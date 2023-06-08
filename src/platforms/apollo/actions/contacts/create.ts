import { transformContact } from '@/platforms/apollo/actions/mappers';
import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'create-contact',
  {
    operation: 'create',
    resource: 'contacts',
    mutation: true,
    schema: z.object({
      firstName: z.string().nullish(),
      lastName: z.string().nullish(),
      organizationName: z.string().nullish(),
      title: z.string().nullish(),
      ownerId: z.string().nullish(),
      accountId: z.string().nullish(),
      email: z.string().nullish(),
      websiteUrl: z.string().nullish(),
      contactStageId: z.string().nullish(),
      presentRawAddress: z.string().nullish(),
      labelNames: z.array(z.string()).nullish(),
      typedCustomFields: z.record(z.string()),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.contacts.create(auth, {
      first_name: input.firstName,
      last_name: input.lastName,
      organization_name: input.organizationName,
      title: input.title,
      owner_id: input.ownerId,
      account_id: input.accountId,
      email: input.email,
      website_url: input.websiteUrl,
      contact_stage_id: input.contactStageId,
      present_raw_address: input.presentRawAddress,
      label_names: input.labelNames,
      typed_custom_fields: input.typedCustomFields,
    });

    return {
      contact: transformContact(result.data.contact),
      $native: result.$native,
    };
  },
);
