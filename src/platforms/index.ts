import aircall from '@/platforms/aircall';
import dialpad from '@/platforms/dialpad';
import hubspot from '@/platforms/hubspot';
import outreach from '@/platforms/outreach';

export const integrations = {
  outreach,
  aircall,
  hubspot,
  dialpad,
};
export { types as dialpadTypes } from '@/platforms/dialpad';

export const integrationsList = Object.values(integrations);
