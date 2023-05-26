import { transformContact } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';
import client from '../../client';

export default action(
  'contacts-update',
  {
    operation: 'update',
    resource: 'contacts',
    mutation: true,
    schema: z
      .object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        jobTitle: z.string(),
        phone: custom.formattedPhoneNumber(),
        mobilePhone: custom.formattedPhoneNumber(),
      })
      .partial()
      .extend({
        id: z.string(),
      }),
    scopes: ['crm.objects.contacts.write'],
  },
  async ({ auth, input }) => {
    const result = await client.contacts.update(auth, {
      id: input.id,
      firstname: input.firstName,
      lastname: input.lastName,
      email: input.email,
      jobtitle: input.jobTitle,
      mobilephone: input.mobilePhone,
      phone: input.phone,
    });

    return {
      ...transformContact(result.data),
      $native: result.$native,
    };
  },
);
