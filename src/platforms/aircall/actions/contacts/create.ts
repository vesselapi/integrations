import { z } from 'zod';
import { action } from '../../../../sdk';
import client from '../../client';
import { AircallContact } from '../../types';

export default action(
  'contacts-create',
  {
    resource: 'contact',
    mutation: true,
    schema: z.object({
      first_name: z.string().nullish(),
      last_name: z.string().nullish(),
      company_name: z.string().nullish(),
      information: z.string().nullish(),
      emails: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
          }),
        )
        .optional(),
      phone_numbers: z.array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      ),
    }),
    scopes: [],
  },
  async ({ input, auth }): Promise<{ contact: AircallContact }> => {
    return await client.request(
      {
        path: `contacts`,
        method: 'POST',
        body: {
          first_name: input.first_name,
          last_name: input.last_name,
          company_name: input.company_name,
          information: input.information,
        },
      },
      auth,
    );
  },
);
