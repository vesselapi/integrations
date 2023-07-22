import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import { omit } from 'radash';
import { z } from 'zod';

const customFieldsSchema = z
  .record(
    z
      .string()
      .regex(/^custom[0-9]+$/, 'Custom fields must be of the form custom[0-9]+')
      .transform((key) => key as `custom${number}`),
    z.string().nullable(),
  )
  .optional();

const attributesSchema = z.object({
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  occupation: z.string().nullish(),
  addressCity: z.string().nullish(),
  addressCountry: z.string().nullish(),
  addressState: z.string().nullish(),
  addressStreet: z.string().nullish(),
  addressStreet2: z.string().nullish(),
  addressZip: z.string().nullish(),
});

export default action(
  'update-prospect',
  {
    operation: 'update',
    resource: 'prospects',
    mutation: true,
    schema: z.object({
      id: z.number(),
      attributes: z
        .preprocess((input) => {
          const attributes = attributesSchema.safeParse(input);

          if (!attributes.success) {
            return input;
          }

          const customFields = omit(input as any, Object.keys(attributes.data));

          return { customFields, ...attributes };
        }, attributesSchema.extend({ customFields: customFieldsSchema }))
        .transform((attr) => ({
          ...omit(attr, ['customFields']),
          ...attr.customFields,
        })),
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
