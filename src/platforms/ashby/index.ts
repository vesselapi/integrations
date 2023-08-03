import { client } from '@/platforms/ashby/client';
import boxIcon from '@/platforms/ashby/icons/box';
import fullIcon from '@/platforms/ashby/icons/full';
import { auth, platform } from '@/sdk';

export default platform('ashby', {
  auth: [auth.basic({})],
  display: {
    name: 'Ashby',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#483fac',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
