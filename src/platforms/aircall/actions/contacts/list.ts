import { z } from 'zod';
import { action } from '../../../../sdk';
import {client} from '../../client';
import { AircallContact, AircallPagination } from '../../types';

export default action(
  'contacts-list',
  {
    resource: 'contact',
    mutation: false,
    schema: z.object({
      from: z.string(),
      to: z.string(),
      order: z.enum(['asc', 'desc']),
      page: z.number(),
      per_page: z.number(),
    }),
    scopes: [],
  },
  async ({
    input,
    auth,
  }): Promise<{ meta: AircallPagination; users: AircallContact[] }> => {
    return await client.contacts.list(auth, {});
  },
);
