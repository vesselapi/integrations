import zod from 'zod';
import { action } from '../../../sdk';

type Input = {
  id: string;
};

// QUESTION: Add/group-by resource?
export default action<Input>(
  'find-lead',
  {
    resource: 'lead',
    mutation: false,
    schema: zod.object({
      id: zod.string(),
    }),
  },
  async ({ input, auth, fetch }) => {
    const token = await auth.getAccessToken();
    await fetch('https://hubspot.com/lead', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const created = await fetch('');
  },
);
