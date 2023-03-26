import { z } from 'zod';
import { action } from '../../../../sdk';
import client from '../../client';
import { AircallCall, AircallPagination } from '../../types';

export default action(
  'calls-list',
  {
    resource: 'calls',
    mutation: false,
    schema: z.object({
      from: z.string().optional(),
      to: z.string().optional(),
      order: z.enum(['asc', 'desc']).optional(),
      page: z.number().optional(),
      per_page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({
    input,
    auth,
  }): Promise<{ meta: AircallPagination; users: AircallCall[] }> => {
    return await client.request(
      {
        path: `calls`,
        method: 'GET',
        query: {
          from: input.from,
          to: input.to,
          order: input.order,
          page: input.page,
          per_page: input.per_page,
        },
      },
      auth,
    );
  },
);
