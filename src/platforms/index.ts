import aircall from '@/platforms/aircall';
import dialpad from '@/platforms/dialpad';
import outreach from '@/platforms/outreach';

export const integrations = {
  outreach,
  aircall,
  dialpad,
};
export { types as dialpadTypes } from '@/platforms/dialpad';

export const integrationsList = Object.values(integrations);
