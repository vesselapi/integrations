import { client } from '@/platforms/gong/client';
import fullIcon from '@/platforms/gong/icons/full';
import boxIcon from '@/platforms/gong/icons/box';
import { auth, platform } from '@/sdk';


export default platform('gong', {
  auth: [auth.basic({})],
  display: {
    name: 'Gong',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#8039DF',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
