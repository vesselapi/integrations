import { transformContact } from '@/platforms/aircall/actions/mappers';
import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';
import { aircallUrl } from '../validators';

export default action(
  'list-contacts',
  {
    operation: 'list',
    resource: 'contacts',
    mutation: false,
    schema: z.object({
      from: z.string().optional(),
      perPage: z.number().optional(),
      nextPageLink: aircallUrl().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const contacts = await client.contacts.list(auth, {
      from: input.from,
      per_page: input.perPage,
      next_page_link: input.nextPageLink,
    });

    return {
      contacts: contacts.data.contacts.map(transformContact),
      $native: contacts.$native,
    };
  },
);
