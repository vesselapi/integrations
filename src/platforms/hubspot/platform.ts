import { platform } from '../../sdk';
import client from './client';

export default platform('hubspot', {
  auth: {
    type: 'OAUTH2',
  },
  client,
});
