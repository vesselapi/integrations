import { client } from '@/platforms/airtable/client';
import boxIcon from '@/platforms/airtable/logos/box';
import fullIcon from '@/platforms/airtable/logos/full';
import { auth, platform } from '@/sdk';

export default platform('airtable', {
  auth: auth.oauth2({
    authUrl: `https://airtable.com/oauth2/v1/authorize`,
    tokenUrl: `https://airtable.com/oauth2/v1/token`,
    tokenAuth: 'header',
  }),
  display: {
    name: 'Airtable',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#333333',
    },
    categories: ['crm'],
  },
  client,
  constants: {},
  actions: {},
});
