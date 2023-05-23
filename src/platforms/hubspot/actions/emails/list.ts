import { transformEmail } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';
import { hubspotCommonAssociationsSchema } from '../../schemas';

export default action(
  'list-emails',
  {
    operation: 'list',
    resource: 'emails',
    mutation: false,
    schema: z.object({
      after: z.string().optional(),
      pageSize: z.number().optional(),
      associations: z.array(hubspotCommonAssociationsSchema).optional(),
    }),
    scopes: ['sales-email-read'],
  },
  async ({ auth, input }) => {
    const result = await client.emails.list(auth, input);

    return {
      paging: result.data.paging,
      results: result.data.results?.map(transformEmail),
      $native: result.$native,
    };
  },
);
