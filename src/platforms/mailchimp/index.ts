import { auth, platform } from '@/sdk';

import findList from '@/platforms/mailchimp/actions/lists/find';
import listLists from '@/platforms/mailchimp/actions/lists/list';
import createMember from '@/platforms/mailchimp/actions/members/create';
import searchMember from '@/platforms/mailchimp/actions/members/search';
import updateMember from '@/platforms/mailchimp/actions/members/update';
import { client } from '@/platforms/mailchimp/client';
import * as constants from '@/platforms/mailchimp/constants';
import boxIcon from '@/platforms/mailchimp/logos/box';
import fullIcon from '@/platforms/mailchimp/logos/full';

export * as types from './schemas';
export default platform('mailchimp', {
  auth: auth.oauth2({
    authUrl: 'https://login.mailchimp.com/oauth2/authorize',
    tokenUrl: 'https://login.mailchimp.com/oauth2/token',
    isRetryable: async ({}) => false,
    default: true,
  }),
  display: {
    name: 'Mailchimp',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#ffe01b',
    },
    categories: ['marketing-automation'],
  },
  client,
  constants,
  actions: {
    createMember,
    updateMember,
    searchMember,

    findList,
    listLists,
  },
});
