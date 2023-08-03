import { client } from '@/platforms/survey-monkey/client';
import boxIcon from '@/platforms/survey-monkey/logos/box';
import fullIcon from '@/platforms/survey-monkey/logos/full';
import { auth, platform } from '@/sdk';

export default platform('survey-monkey', {
  auth: auth.oauth2({
    authUrl: 'https://api.surveymonkey.com/oauth/authorize',
    tokenUrl: 'https://api.surveymonkey.com/oauth/token',
  }),
  display: {
    name: 'Survey Monkey',
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
