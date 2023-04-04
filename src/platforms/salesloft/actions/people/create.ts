import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'create-people',
  {
    operation: 'create',
    resource: 'people',
    mutation: true,
    schema: custom.object({
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      title: z.string().optional(),
      owner: custom
        .object({
          id: z.string(),
        })
        .optional(),
      account: custom
        .object({
          id: z.string(),
        })
        .optional(),
      email_address: z.string().optional(),
      secondary_email_address: z.string().optional(),
      personal_email_address: z.string().optional(),
      custom_fields: custom.object({}).passthrough(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.people.create(auth, input);
  },
);
