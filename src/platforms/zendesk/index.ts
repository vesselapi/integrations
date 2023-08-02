import { auth, platform } from '../../sdk';

import { client } from './client';
import { icon } from './icon';

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
    iconURI: icon,
    logos: {
      defaultURI: icon,
    },
    categories: ['ticketing'],
  },
  client,
  constants: {},
  actions: {},
});
