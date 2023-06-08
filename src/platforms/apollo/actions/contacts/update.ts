import { transformContact } from '@/platforms/apollo/actions/mappers';
import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'update-contact',
  {
    operation: 'update',
    resource: 'contacts',
    mutation: true,
    schema: z.object({
      id: z.string(),
      firstName: z.string().nullish(),
      lastName: z.string().nullish(),
      organizationName: z.string().nullish(),
      title: z.string().nullish(),
      ownerId: z.string().nullish(),
      accountId: z.string().nullish(),
      email: z.string().nullish(),
      websiteUrl: z.string().nullish(),
      presentRawAddress: z.string().nullish(),
      labelNames: z.array(z.string()).nullish(),
      typedCustomFields: z.record(z.string()),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.contacts.update(auth, {
      id: input.id,
      first_name: input.firstName,
      last_name: input.lastName,
      organization_name: input.organizationName,
      title: input.title,
      owner_id: input.ownerId,
      account_id: input.accountId,
      email: input.email,
      website_url: input.websiteUrl,
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
