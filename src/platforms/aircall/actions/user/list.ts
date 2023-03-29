import { z } from 'zod';
import { action } from '../../../../sdk';
import {client} from '../../client';
import { AircallPagination, AircallUser } from '../../types';

export default action(
  'users-list',
  {
    resource: 'user',
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
  }): Promise<{ meta: AircallPagination; users: AircallUser[] }> => {
   return await client.users.list(auth, {});
  },
);
