import aircall from '@/platforms/aircall';
import apollo from '@/platforms/apollo';
import dialpad from '@/platforms/dialpad';
import outreach from '@/platforms/outreach';
import ringcentral from '@/platforms/ringcentral';
import salesloft from '@/platforms/salesloft';

export const integrations = {
  outreach,
  aircall,
  dialpad,
  apollo,
  ringcentral,
  salesloft,
};
export { types as aircallTypes } from '@/platforms/aircall';
export { types as apolloTypes } from '@/platforms/apollo';
export { types as dialpadTypes } from '@/platforms/dialpad';
export { types as outreachTypes } from '@/platforms/outreach';
export { types as ringcentralTypes } from '@/platforms/ringcentral';
export { types as salesloftTypes } from '@/platforms/salesloft';

export const integrationsList = Object.values(integrations);
