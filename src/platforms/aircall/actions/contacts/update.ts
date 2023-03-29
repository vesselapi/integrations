import { z } from 'zod';
import { action } from '../../../../sdk';
import client from '../../client';
import { AircallContact } from '../../types';

export default action(
  'contacts-update',
  {
    resource: 'contact',
    mutation: true,
    schema: z.object({
      id: z.string(),
      first_name: z.string().nullish(),
      last_name: z.string().nullish(),
      company_name: z.string().nullish(),
      information: z.string().nullish(),
    }),
    scopes: [],
  },
  async ({ input, auth }): Promise<{ contact: AircallContact }> => {
    return await client.request(
      {
        path: `contacts/${input.id}`,
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
