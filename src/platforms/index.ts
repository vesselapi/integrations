import aircall from '@/platforms/aircall';
import apollo from '@/platforms/apollo';
import dialpad from '@/platforms/dialpad';
import outreach from '@/platforms/outreach';

export const integrations = {
  outreach,
  aircall,
  dialpad,
  apollo,
};
export { types as dialpadTypes } from '@/platforms/dialpad';

export const integrationsList = Object.values(integrations);
