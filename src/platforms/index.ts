import aircall from '@/platforms/aircall';
import apollo from '@/platforms/apollo';
import dialpad from '@/platforms/dialpad';
import outreach from '@/platforms/outreach';
import ringcentral from '@/platforms/ringcentral';
import salesloft from '@/platforms/salesloft';
import { Platform } from '@/sdk';

export { default as aircall, types as aircallTypes } from '@/platforms/aircall';
export { default as apollo, types as apolloTypes } from '@/platforms/apollo';
export { default as dialpad, types as dialpadTypes } from '@/platforms/dialpad';
export {
  default as outreach,
  types as outreachTypes,
} from '@/platforms/outreach';
export {
  default as ringcentral,
  types as ringcentralTypes,
} from '@/platforms/ringcentral';
export {
  default as salesloft,
  types as salesloftTypes,
} from '@/platforms/salesloft';

export const integrationsList: Platform<any, any, any>[] = Object.values([
  aircall,
  apollo,
  dialpad,
  outreach,
  ringcentral,
  salesloft,
]);
