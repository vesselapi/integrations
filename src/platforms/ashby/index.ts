import { client } from '@/platforms/ashby/client';
import boxIcon from '@/platforms/ashby/icons/box';
import { auth, platform } from '@/sdk';

export default platform('ashby', {
  auth: auth.basic(),
  display: {
    name: 'Ashby',
    logos: {
      defaultURI: boxIcon,
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
