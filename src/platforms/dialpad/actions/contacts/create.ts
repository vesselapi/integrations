import { z } from 'zod';
import { action } from '../../../../sdk';
import client from '../../client';

import { transformContact } from '@/platforms/dialpad/actions/mappers';
import * as custom from '@/sdk/validators';

export default action(
  'contacts-create',
  {
    operation: 'create',
    resource: 'contacts',
    mutation: true,
    schema: z.object({
      firstName: z.string(),
      lastName: z.string(),
      companyName: z.string(),
      emails: z.array(z.string()),
      extension: z.string(),
      jobTitle: z.string(),
      phones: z.array(custom.formattedPhoneNumber()),
      urls: z.array(z.string()),
    }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.contacts.create(auth, {
      first_name: input.firstName,
      last_name: input.lastName,
      company_name: input.companyName,
      emails: input.emails,
      extension: input.extension,
      job_title: input.jobTitle,
      phones: input.phones,
      urls: input.urls,
    });

    return {
      ...transformContact(result.data),
      $native: result.$native,
    };
  },
);
