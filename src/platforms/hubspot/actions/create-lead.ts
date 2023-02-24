import { action } from '../../../sdk';
import hubspot from '../platform'

// QUESTION: Add/group-by resource?
export const createLead = action('create-lead', {
  resource: 'lead',
  mutation: true
}, async () => {
  const created = await hubspot.fetch('https://hubspot.com/leads')
});
