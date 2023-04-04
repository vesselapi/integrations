import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'update-prospect',
  {
    operation: 'update',
    resource: 'prospects',
    mutation: true,
    schema: custom.object({
      id: z.number(),
      attributes: custom
        .object({
          firstName: z.string().nullish(),
          lastName: z.string().nullish(),
          occupation: z.string().nullish(),
          addressCity: z.string().nullish(),
          addressCountry: z.string().nullish(),
          addressState: z.string().nullish(),
          addressStreet: z.string().nullish(),
          addressStreet2: z.string().nullish(),
          addressZip: z.string().nullish(),
        })
        .catchall(
          z
            .string()
            .regex(
              /^custom[0-9]+$/,
              'Custom fields must be of the form custom[0-9]+',
            )
            .transform((key) => key as `custom${number}`)
            .nullable(),
        ),
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
