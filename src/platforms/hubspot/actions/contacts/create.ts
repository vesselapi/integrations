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
    schema: z.object({
      firstName: z.string().optional(),
      lastName: z.string(),
      email: z.string().optional(),
      jobTitle: z.string().optional(),
      phone: custom.formattedPhoneNumber().optional(),
      mobilePhone: custom.formattedPhoneNumber().optional(),
    }),
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
