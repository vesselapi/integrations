import { auth, platform } from '@/sdk';
import { client } from './client';
import * as constants from './constants';
import { icon } from './icon';

export default platform('stripe', {
  auth: auth.oauth2({
    authUrl: 'https://connect.stripe.com/oauth/authorize',
    tokenUrl: 'https://connect.stripe.com/oauth/token',
  }),
  display: {
    name: 'Stripe',
    iconURI: icon,
    categories: [],
  },
  client,
  constants,
  actions: {},
});
