import { client } from '@/platforms/apollo/client';
import { apolloContactCreate } from '@/platforms/apollo/schemas';
import { action } from '@/sdk';

export default action(
  'create-contact',
  {
    operation: 'create',
    resource: 'contacts',
    mutation: true,
    schema: apolloContactCreate,
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.contacts.create(auth, {
      first_name: input.first_name,
      last_name: input.last_name,
      organization_name: input.organization_name,
      title: input.title,
      owner_id: input.owner_id,
      account_id: input.account_id,
      email: input.email,
      website_url: input.website_url,
      contact_stage_id: input.contact_stage_id,
      present_raw_address: input.present_raw_address,
      label_names: input.label_names,
      typed_custom_fields: input.typed_custom_fields,
    });
  },
);
