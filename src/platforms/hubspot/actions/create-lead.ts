import zod from 'zod';
import { action } from '../../../sdk';

export default action(
  'create-lead',
  {
    resource: 'lead',
    mutation: true,
    schema: zod.object({
      name: zod.string(),
    }),
    scopes: [
      'crm.objects.deals.write',
      'crm.objects.deals.read',
      'crm.schemas.deals.write',
      'crm.schemas.deals.read',
    ],
  },
  async ({ input, auth }) => {
    const apiToken = auth.getAccessToken();
    const created = await fetch('https://hubspot.com/leads');
    return {};
  },
);
