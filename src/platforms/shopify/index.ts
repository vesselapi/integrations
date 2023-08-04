import { client } from '@/platforms/shopify/client';
import * as constants from '@/platforms/shopify/constants';
import boxIcon from '@/platforms/shopify/logos/box';
import fullIcon from '@/platforms/shopify/logos/full';
import { auth, platform } from '@/sdk';

export default platform('shopify', {
  auth: auth.oauth2({
    authUrl: ({ answers }) =>
      `https://${answers.shop}.myshopify.com/admin/oauth/authorize`,
    tokenUrl: ({ answers }) =>
      `https://${answers.shop}.myshopify.com/admin/oauth/access_token`,
    questions: [{ type: 'text', id: 'shop', label: 'Shop' }],
  }),
  display: {
    name: 'Shopify',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#008060',
    },
    categories: ['commerce'],
  },
  client,
  constants,
  actions: {},
});
