import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'update-prospect',
  {
    resource: 'prospects',
    mutation: true,
    schema: z.object({
      id: z.number(),
      attributes: z.object({
        firstName: z.string().nullish(),
        lastName: z.string().nullish(),
        occupation: z.string().nullish(),
        addressCity: z.string().nullish(),
        addressCountry: z.string().nullish(),
        addressState: z.string().nullish(),
        addressStreet: z.string().nullish(),
        addressStreet2: z.string().nullish(),
        addressZip: z.string().nullish(),
      }),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.prospects.update(auth, {
      id: input.id,
      attributes: input.attributes,
    });
  },
);
