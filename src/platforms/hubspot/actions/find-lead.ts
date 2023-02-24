import zod from 'zod';
import { action } from '../../../sdk';
import hubspot from '../platform';

type Input = {
  id: string;
};

// QUESTION: Add/group-by resource?
export const findLead = action<Input>(
  'find-lead',
  {
    resource: 'lead',
    mutation: false,
    schema: zod.object({
      id: zod.string(),
    }),
  },
  async (input, auth) => {
    const token = await auth.getAccessToken()
    await fetch('https://hubspot.com/lead', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const created = await hubspot.fetch('');
  },
);
