import { client } from '@/platforms/woocommerce/client';
import { icon } from '@/platforms/woocommerce/icon';
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
    iconURI: icon,
    categories: [],
  },
  client,
  constants,
  actions: {},
  unification: {
    resources: [],
  },
});
