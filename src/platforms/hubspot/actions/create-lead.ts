import { action } from '../../../sdk';

// QUESTION: Add/group-by resource?
export default action(
  'create-lead',
  {
    resource: 'lead',
    mutation: true,
  },
  async ({ input, auth, fetch }) => {
    const apiToken = auth.getAccessToken();
    const created = await fetch('https://hubspot.com/leads');
  },
);
