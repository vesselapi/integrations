import { auth, platform } from '@/sdk';
import { guard } from 'radash';

import client from './client';
import * as constants from './constants';
import { icon } from './icon';
export * as types from './schemas';

import associationsCreate from '@/platforms/hubspot/actions/associations/create';

import createCall from '@/platforms/hubspot/actions/calls/create';
import listDispositions from '@/platforms/hubspot/actions/calls/dispositions';
import findCall from '@/platforms/hubspot/actions/calls/find';
import listCalls from '@/platforms/hubspot/actions/calls/list';
import updateCall from '@/platforms/hubspot/actions/calls/update';

import createCompany from '@/platforms/hubspot/actions/companies/create';
import findCompany from '@/platforms/hubspot/actions/companies/find';
import listCompanies from '@/platforms/hubspot/actions/companies/list';
import updateCompany from '@/platforms/hubspot/actions/companies/update';

import findContactList from '@/platforms/hubspot/actions/contact-lists/find';
import listContactLists from '@/platforms/hubspot/actions/contact-lists/list';

import createContact from '@/platforms/hubspot/actions/contacts/create';
import findContact from '@/platforms/hubspot/actions/contacts/find';
import listContacts from '@/platforms/hubspot/actions/contacts/list';
import updateContact from '@/platforms/hubspot/actions/contacts/update';

import createDeal from '@/platforms/hubspot/actions/deals/create';
import findDeal from '@/platforms/hubspot/actions/deals/find';
import listDeals from '@/platforms/hubspot/actions/deals/list';
import updateDeal from '@/platforms/hubspot/actions/deals/update';

import createEmail from '@/platforms/hubspot/actions/emails/create';
import findEmail from '@/platforms/hubspot/actions/emails/find';
import listEmails from '@/platforms/hubspot/actions/emails/list';
import updateEmail from '@/platforms/hubspot/actions/emails/update';

import createMeeting from '@/platforms/hubspot/actions/meetings/create';
import findMeeting from '@/platforms/hubspot/actions/meetings/find';
import listMeetings from '@/platforms/hubspot/actions/meetings/list';
import updateMeeting from '@/platforms/hubspot/actions/meetings/update';

import createNote from '@/platforms/hubspot/actions/notes/create';
import findNote from '@/platforms/hubspot/actions/notes/find';
import listNotes from '@/platforms/hubspot/actions/notes/list';
import updateNote from '@/platforms/hubspot/actions/notes/update';

import findOwner from '@/platforms/hubspot/actions/owners/find';
import listOwners from '@/platforms/hubspot/actions/owners/list';

import createProperty from '@/platforms/hubspot/actions/properties/create';
import listProperties from '@/platforms/hubspot/actions/properties/list';

import createTask from '@/platforms/hubspot/actions/tasks/create';
import findTask from '@/platforms/hubspot/actions/tasks/find';
import listTasks from '@/platforms/hubspot/actions/tasks/list';
import updateTask from '@/platforms/hubspot/actions/tasks/update';

export default platform('hubspot', {
  auth: auth.oauth2({
    authUrl: `https://app.hubspot.com/oauth/authorize`,
    tokenUrl: `https://api.hubapi.com/oauth/v1/token`,
    tokenAuth: 'body',
    isRetryable: async ({ status, json }) => {
      if (status === 204) return false;
      const { category } = (json() ?? {}) as { category?: string };
      if (!category) {
        return false;
      }
      const checkExpiredAuth = async () =>
        ['EXPIRED_AUTHENTICATION', 'INVALID_AUTHENTICATION'].includes(category);
      return (await guard(checkExpiredAuth)) ?? false;
    },
    default: true,
  }),
  display: { name: 'HubSpot', iconURI: icon, categories: ['crm'] },
  constants,
  client,
  actions: {
    associationsCreate,

    createCall,
    listDispositions,
    findCall,
    listCalls,
    updateCall,

    createCompany,
    findCompany,
    listCompanies,
    updateCompany,

    findContactList,
    listContactLists,

    createContact,
    findContact,
    listContacts,
    updateContact,

    createDeal,
    findDeal,
    listDeals,
    updateDeal,

    createEmail,
    findEmail,
    listEmails,
    updateEmail,

    createMeeting,
    findMeeting,
    listMeetings,
    updateMeeting,

    createNote,
    findNote,
    listNotes,
    updateNote,

    findOwner,
    listOwners,

    createProperty,
    listProperties,

    createTask,
    findTask,
    listTasks,
    updateTask,
  },
});
