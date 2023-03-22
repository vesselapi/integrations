import { z } from 'zod';
import { action } from '../../../sdk';

export default action(
  'find-lead',
  {
    resource: 'lead',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [
      'crm.objects.deals.write',
      'crm.objects.deals.read',
      'crm.schemas.deals.write',
      'crm.schemas.deals.read',
    ],
  },
  async ({ input, auth }) => {
    // Using auth to get accessToken
    const accessToken = await auth.getTokenString();
    await fetch('https://hubspot.com/lead', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      power: 3,
    };
  },
);
