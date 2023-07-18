import { auth, platform } from '@/sdk';
import { client } from './client';
import * as constants from './constants';
import { icon } from './icon';

export default platform('close', {
  auth: auth.apiToken(),
  display: { name: 'Close', iconURI: icon, categories: ['crm'] },
  constants,
  client,
  actions: {},
});
