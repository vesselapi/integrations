import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'create-prospect',
  {
    resource: 'prospects',
    mutation: true,
    schema: z.object({
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
        emails: z.array(z.string()).optional(),
      }),
      relationships: z.object({
        ownerId: z.number().optional(),
        accountId: z.number().optional(),
      }),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.prospects.create(auth, {
      attributes: input.attributes,
      relationships: {
        owner: input.relationships.ownerId
          ? { data: { id: input.relationships.ownerId, type: 'user' } }
          : undefined,
        account: input.relationships.accountId
          ? {
              data: { id: input.relationships.accountId, type: 'account' },
            }
          : undefined,
      },
    });
  },
);
