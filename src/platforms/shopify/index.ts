import { client } from '@/platforms/shopify/client';
import * as constants from '@/platforms/shopify/constants';
import { icon } from '@/platforms/shopify/icon';
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
    iconURI: icon,
    logos: {
      defaultURI: icon,
    },
    categories: ['commerce'],
  },
  client,
  constants,
  actions: {},
});
