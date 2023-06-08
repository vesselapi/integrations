import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

import { transformContact } from '@/platforms/hubspot/actions/mappers';
import * as custom from '@/sdk/validators';

export default action(
  'contacts-create',
  {
    operation: 'create',
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
      .partial(),
    scopes: ['crm.objects.contacts.write'],
  },
  async ({ auth, input }) => {
    const result = await client.contacts.create(auth, {
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
