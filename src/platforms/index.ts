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
export { types as aircallTypes } from '@/platforms/aircall';
export { types as apolloTypes } from '@/platforms/apollo';
export { types as dialpadTypes } from '@/platforms/dialpad';
export { types as outreachTypes } from '@/platforms/outreach';

export const integrationsList = Object.values(integrations);
