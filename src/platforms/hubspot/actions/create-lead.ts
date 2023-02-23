import { action } from '../../../sdk';
import hubspot from '../platform'

export const createLead = action('create-lead', async () => {
  const created = await hubspot.fetch('')
});
