import { client } from '@/platforms/amplitude/client';
import boxIcon from '@/platforms/amplitude/icons/box';
import fullIcon from '@/platforms/amplitude/icons/full';
import { auth, platform } from '@/sdk';

export default platform('amplitude', {
  auth: [auth.basic({})],
  display: {
    name: 'Amplitude',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#1E61F0',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
