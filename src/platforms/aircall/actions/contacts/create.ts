import { transformContact } from '@/platforms/aircall/actions/mappers';
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
    schema: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      companyName: z.string().optional(),
      information: z.string().optional(),
      emails: z
        .array(
          z.object({
            label: z.string().optional(),
            value: z.string(),
          }),
        )
        .optional(),
      phoneNumbers: z.array(
        z.object({
          label: z.string().optional(),
          value: custom.formattedPhoneNumber(),
        }),
      ),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.contacts.create(auth, {
      first_name: input.firstName,
      last_name: input.lastName,
      company_name: input.companyName,
      information: input.information,
      emails: input.emails,
      phone_numbers: input.phoneNumbers,
    });

    return {
      contact: transformContact(result.data.contact),
      $native: result.$native,
    };
  },
);
