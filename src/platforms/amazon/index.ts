import { client } from '@/platforms/amazon/client';
import fullIcon from '@/platforms/amazon/logos/full';
import boxIcon from '@/platforms/amazon/logos/box';
import { auth, platform } from '@/sdk';

export default platform('amazon', {
  auth: auth.oauth2({ authUr: https://www.amazon.com/ap/oa,
 tokenUrl: ({ answers }) => https://api.amazon.${answers.extension}/auth/o2/token,
 authParams: {"response_type":"code"}),
  display: {
    name: 'Amazon',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#ff9900',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
