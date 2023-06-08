import * as custom from '@/sdk/validators';
import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'start-user-call',
  {
    operation: 'start-call',
    resource: 'users',
    mutation: false,
    schema: z.object({
      id: z.number().or(z.string()),
      numberId: z.number().or(z.string()),
      to: custom.formattedPhoneNumber(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.users.startCall(auth, {
      id: input.id,
      number_id: input.numberId,
      to: input.to,
    });

    return {
      call: result.data.call, // TODO figure out why this is 'any'
      $native: result.$native,
    };
  },
);
