import { client } from '@/platforms/customer.io/client';
import { icon } from '@/platforms/customer.io/icon';
import { auth, platform } from '@/sdk';

export default platform('customer.io', {
  auth: auth.apiToken(),
  display: {
    name: 'Customer.io',
    iconURI: icon,
    icons: {
      defaultURI: icon,
    },
    categories: ['marketing-automation'],
  },
  client,
  constants: {},
  actions: {},
});
