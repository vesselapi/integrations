import { client } from '@/platforms/outreach/client';
import { action, ActionClientError } from '@/sdk';
import { z } from 'zod';

export default action(
  'create-prospect',
  {
    resource: 'prospects',
    mutation: true,
    schema: z.object({
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
    const result = await client.prospects.create(auth, {
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

    if (result.error) {
      throw ActionClientError.fromClientResult(result.error);
    }

    return result.data;
  },
);
