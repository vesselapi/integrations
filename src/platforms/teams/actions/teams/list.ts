import { client } from '@/platforms/microsoft/client';
import * as microsoft from '@/platforms/microsoft/validators';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-teams',
  {
    operation: 'list',
    resource: 'teams',
    mutation: false,
    schema: z.object({
      cursor: microsoft.microsoftUrl().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.groups.list(auth, {
      cursor: input.cursor,
      filter: "resourceProvisioningOptions/Any(x:x eq 'Team')",
    });
  },
);
