import { client } from '@/platforms/accelo/client';
import boxIcon from '@/platforms/accelo/logos/box';
import { auth, platform } from '@/sdk';

export default platform('accelo', {
  auth: auth.oauth2({ authUr: ({ answers }) => https://${answers.subdomain}.api.accelo.com/oauth2/v0/authorize,
 tokenUrl: ({ answers }) => https://${answers.subdomain}.api.accelo.com/oauth2/v0/token,
 scopeSeparator: ,,
 authParams: {"response_type":"code"}),
  display: {
    name: 'Accelo',
    logos: {
     defaultURI: boxIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#eca53d',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
