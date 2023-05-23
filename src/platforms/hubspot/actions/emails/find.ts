import { transformEmail } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';
import { hubspotCommonAssociationsSchema } from '../../schemas';

export default action(
  'find-email',
  {
    operation: 'find',
    resource: 'emails',
    mutation: false,
    schema: z.object({
      id: z.string(),
      associations: z.array(hubspotCommonAssociationsSchema).optional(),
    }),
    scopes: ['sales-email-read'],
  },
  async ({ auth, input }) => {
    const result = await client.emails.find(auth, {
      id: input.id,
    });

    return {
      ...transformEmail(result.data),
      $native: result.$native,
    };
  },
);
