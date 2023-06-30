import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import { z } from 'zod';
import { transformRecord } from '../mappers';

export default action(
  'soql-query',
  {
    operation: 'query',
    resource: 'soql',
    mutation: true,
    schema: z.object({
      query: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const {
      data: { records, totalSize },
      $native,
    } = await client.query(auth, {
      query: input.query,
    });
    return {
      records: records.map(transformRecord),
      totalSize,
      $native,
    };
  },
);
