import { client } from '@/platforms/outreach/client';
import { action, ActionClientError } from '@/sdk';
import { z } from 'zod';

export default action(
  'update-prospect',
  {
    resource: 'prospects',
    mutation: true,
    schema: z.object({
      id: z.number(),
      attributes: z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        occupation: z.string().optional(),
        addressCity: z.string().optional(),
        addressCountry: z.string().optional(),
        addressState: z.string().optional(),
        addressStreet: z.string().optional(),
        addressStreet2: z.string().optional(),
        addressZip: z.string().optional(),
      }),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.prospects.update(auth, {
      id: input.id,
      attributes: input.attributes,
    });

    if (result.error) {
      throw ActionClientError.fromClientResult(result.error);
    }

    return result.data;
  },
);
