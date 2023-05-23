import {
  transformContactList,
  transformContactListContact,
} from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'find-contact-list',
  {
    operation: 'find',
    resource: 'contact-lists',
    mutation: false,
    schema: z.object({
      id: z.string(),
      offset: z.number().optional(),
      count: z.number().optional(),
    }),
    scopes: ['crm.lists.read'],
  },
  async ({ auth, input }) => {
    const result = await client.contactLists.find(auth, {
      id: input.id,
    });

    const contacts = await client.contactLists.contacts(auth, {
      listId: input.id,
      vidOffset: input.offset,
      count: input.count,
    });

    return {
      ...transformContactList(result.data),
      contacts: contacts.data.contacts?.map(transformContactListContact),
      $native: {
        ...result.$native,
        contacts: contacts.$native,
      },
    };
  },
);
