import { transformPerson } from '@/platforms/salesloft/actions/mappers';
import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'create-people',
  {
    operation: 'create',
    resource: 'people',
    mutation: true,
    schema: z.object({
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
      customFields: z.object({}).passthrough(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.people.create(auth, {
      first_name: input.firstName,
      last_name: input.lastName,
      city: input.city,
      state: input.state,
      country: input.country,
      title: input.title,
      owner: input.owner,
      account: input.account,
      email_address: input.emailAddress,
      secondary_email_address: input.secondaryEmailAddress,
      personal_email_address: input.personalEmailAddress,
      custom_fields: input.customFields,
    });

    return {
      data: transformPerson(result.data.data),
      $native: result.$native,
    };
  },
);
