import { client } from '@/platforms/gong/client';
import boxIcon from '@/platforms/gong/icons/box';
import fullIcon from '@/platforms/gong/icons/full';
import { auth, platform } from '@/sdk';

export default platform('gong', {
  auth: auth.basic({
    questions: [
      {
        type: 'text',
        id: 'username',
        label: 'Access Key',
      },
      {
        type: 'text',
        id: 'password',
        label: 'Access Key Secret',
      },
    ],
  }),
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
