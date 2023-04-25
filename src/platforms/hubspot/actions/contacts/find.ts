import { transformContact } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';
import { hubspotCommonAssociationsSchema } from '../../schemas';

export default action(
  'find-contact',
  {
    operation: 'find',
    resource: 'contacts',
    mutation: false,
    schema: z.object({
      id: z.string(),
      associations: z.array(hubspotCommonAssociationsSchema).optional(),
    }),
    scopes: ['crm.objects.contacts.read'],
  },
  async ({ auth, input }) => {
    const result = await client.contacts.find(auth, {
      id: input.id,
    });

    return {
      ...transformContact(result.data),
      $native: result.$native,
    };
  },
);
