import * as custom from '@/sdk/validators';
import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'create-contact',
  {
    operation: 'create',
    resource: 'contacts',
    mutation: true,
    schema: custom.object({
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      company_name: z.string().optional(),
      information: z.string().optional(),
      emails: z
        .array(
          custom.object({
            label: z.string().optional(),
            value: z.string(),
          }),
        )
        .optional(),
      phone_numbers: z.array(
        custom.object({
          label: z.string().optional(),
          value: custom.formattedPhoneNumber(),
        }),
      ),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.contacts.create(auth, {
      first_name: input.first_name,
      last_name: input.last_name,
      company_name: input.company_name,
      information: input.information,
      emails: input.emails,
      phone_numbers: input.phone_numbers,
    });
  },
);
