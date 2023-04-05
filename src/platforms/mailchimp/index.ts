import { auth, platform } from '@/sdk';

import findList from '@/platforms/mailchimp/actions/lists/find';
import listLists from '@/platforms/mailchimp/actions/lists/list';
import createMember from '@/platforms/mailchimp/actions/members/create';
import searchMember from '@/platforms/mailchimp/actions/members/search';
import updateMember from '@/platforms/mailchimp/actions/members/update';
import { client } from '@/platforms/mailchimp/client';
import * as constants from '@/platforms/mailchimp/constants';
import { icon } from '@/platforms/mailchimp/icon';

export * as types from './schemas';
export default platform('mailchimp', {
  auth: auth.oauth2({
    authUrl: 'https://login.mailchimp.com/oauth2/authorize',
    tokenUrl: 'https://login.mailchimp.com/oauth2/token',
    isRetryable: async ({}) => false,
  }),
  display: {
    name: 'Mailchimp',
    iconURI: icon,
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
