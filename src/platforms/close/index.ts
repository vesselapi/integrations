import boxIcon from '@/platforms/close/logos/box';
import fullIcon from '@/platforms/close/logos/full';
import { auth, platform } from '@/sdk';
import { client } from './client';
import * as constants from './constants';

export default platform('close', {
  auth: auth.apiToken(),
  display: {
    name: 'Close',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#48b178',
    },
    categories: ['crm'],
  },
  constants,
  client,
  actions: {},
});
