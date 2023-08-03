import { client } from '@/platforms/mixpanel/client';
import fullIcon from '@/platforms/mixpanel/icons/full';
import boxIcon from '@/platforms/mixpanel/icons/box';
import { auth, platform } from '@/sdk';


export default platform('mixpanel', {
  auth: [auth.basic({})],
  display: {
    name: 'Mixpanel',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#1F1F24',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
