import { client } from '@/platforms/customer.io/client';
import fullIcon from '@/platforms/customer.io/logos/full';
import boxIcon from '@/platforms/customer.io/logos/box';
import { auth, platform } from '@/sdk';

export default platform('customer.io', {
  auth: auth.apiToken(),
  display: {
    name: 'Customer.io',
    logos: {
        defaultURI: fullIcon ?? boxIcon,
        fullURI: fullIcon,
        boxURI: boxIcon,
    },
    colors: {
        primary: '#5721CC',
    },
    categories: ["marketing-automation"],
    },
  client,
  constants: {},
  actions: {},
});
