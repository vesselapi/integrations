import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'graphql-query',
  {
    operation: 'query',
    resource: 'graphql',
    mutation: true,
    schema: z.object({
      query: z.string(),
    }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const { data, $native } = await client.query(auth, {
      query: input.query,
    });
    return {
      data: data.data ?? null,
      errors: data.errors ?? null,
      $native,
    };
  },
);
