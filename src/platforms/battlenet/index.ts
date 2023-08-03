import { client } from '@/platforms/battlenet/client';
import { auth, platform } from '@/sdk';
import { defaultIcon } from '../defaultIcon';

export default platform('battlenet', {
  auth: auth.oauth2({
    authUrl: ({ answers }) =>
      `https://oauth.battle.${answers.extension}/authorize`,
    tokenUrl: ({ answers }) =>
      `https://oauth.battle.${answers.extension}/token`,
    questions: [
      {
        type: 'text',
        id: 'extension',
        label: 'What is the extension for your region?',
      },
    ],
  }),
  display: {
    name: 'Battlenet',
    logos: {
      defaultURI: defaultIcon,
    },
    colors: {
      primary: '#0e162d',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
