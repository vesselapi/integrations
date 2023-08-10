import { client } from '@/platforms/shortcut/client';
import boxIcon from '@/platforms/shortcut/logos/box';
import fullIcon from '@/platforms/shortcut/logos/full';
import { auth, platform } from '@/sdk';

export default platform('shortcut', {
  auth: auth.apiToken(),
  display: {
    name: 'Shortcut',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#452B5B',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
