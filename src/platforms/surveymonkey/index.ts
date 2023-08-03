import { client } from '@/platforms/surveymonkey/client';
import boxIcon from '@/platforms/surveymonkey/logos/box';
import fullIcon from '@/platforms/surveymonkey/logos/full';
import { auth, platform } from '@/sdk';

export default platform('surveymonkey', {
  auth: auth.oauth2({
    authUrl: 'https://api.surveymonkey.com/oauth/authorize',
    tokenUrl: 'https://api.surveymonkey.com/oauth/token',
  }),
  display: {
    name: 'SurveyMonkey',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#00bf6f',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
