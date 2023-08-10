import { auth, platform } from '../../sdk';

import boxIcon from '@/platforms/zendesk/logos/box';
import fullIcon from '@/platforms/zendesk/logos/full';
import { client } from './client';

export default platform('zendesk', {
  auth: [
    // TODO: Add OAuth support. This will require getting an approved app.
    auth.apiToken({
      questions: [
        {
          type: 'text',
          id: 'email',
          label: 'Email Address',
        },
        {
          id: 'subdomain',
          type: 'text',
          label: 'What is your account Subdomain?',
        },
      ],
      default: true,
    }),
    auth.basic({
      questions: [
        { type: 'text', id: 'username', label: 'Username' },
        { type: 'text', id: 'password', label: 'Password' },
        {
          id: 'subdomain',
          type: 'text',
          label: 'What is your account Subdomain?',
        },
      ],
    }),
  ],
  display: {
    name: 'Zendesk',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#17494D',
    },
    categories: ['ticketing'],
  },
  client,
  constants: {},
  actions: {},
});
