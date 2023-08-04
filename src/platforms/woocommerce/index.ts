import { client } from '@/platforms/woocommerce/client';
import fullIcon from '@/platforms/woocommerce/logos/full';
import boxIcon from '@/platforms/woocommerce/logos/box';
import { auth, platform } from '@/sdk';
import * as constants from './constants';

export default platform('woocommerce', {
  auth: auth.apiToken({
    questions: [
      { type: 'text', id: 'wooCommerceUrl', label: 'WooCommerce URL' },
      { type: 'text', id: 'consumerKey', label: 'Consumer Key' },
      { type: 'text', id: 'consumerSecret', label: 'Consumer Secret' },
    ],
  }),
  display: {
    name: 'WooCommerce',
    logos: {
        defaultURI: fullIcon ?? boxIcon,
        fullURI: fullIcon,
        boxURI: boxIcon,
    },
    colors: {
        primary: '#7f54b3',
    },
    categories: ["commerce"],
    },
  client,
  constants,
  actions: {},
});
