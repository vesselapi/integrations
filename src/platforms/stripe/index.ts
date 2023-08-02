import { client } from './client';
import { icon } from './icon';
import * as constants from './constants';
import { auth, platform } from '@/sdk';

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
