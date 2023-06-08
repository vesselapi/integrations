import { transformPerson } from '@/platforms/salesloft/actions/mappers';
import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'update-people',
  {
    operation: 'update',
    resource: 'people',
    mutation: true,
    schema: z.object({
      id: z.string(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      title: z.string().optional(),
      owner: z
        .object({
          id: z.string(),
        })
        .optional(),
      account: z
        .object({
          id: z.string(),
        })
        .optional(),
      emailAddress: z.string().optional(),
      secondaryEmailAddress: z.string().optional(),
      personalEmailAddress: z.string().optional(),
      customFields: z.object({}),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.people.update(auth, input);

    return {
      data: transformPerson(result.data.data),
      $native: result.$native,
    };
  },
);
