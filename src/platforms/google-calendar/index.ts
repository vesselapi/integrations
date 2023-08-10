import { client } from '@/platforms/google-calendar/client';
import boxIcon from '@/platforms/google-calendar/logos/box';
import fullIcon from '@/platforms/google-calendar/logos/full';
import { auth, platform } from '@/sdk';

export default platform('google-calendar', {
  auth: auth.oauth2({
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    authParams: {
      access_type: 'offline',
      prompt: 'consent',
    },
  }),
  display: {
    name: 'Google Calendar',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#34A853',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
