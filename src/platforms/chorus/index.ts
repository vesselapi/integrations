import { client } from '@/platforms/chorus/client';
import fullIcon from '@/platforms/chorus/logos/full';
import boxIcon from '@/platforms/chorus/logos/box';
import { auth, platform } from '@/sdk';

export default platform('chorus', {
  auth: auth.basic(),
  display: {
    name: 'Chorus',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#00b5d0',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
