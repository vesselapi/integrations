import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'create-template',
  {
    operation: 'create',
    resource: 'templates',
    mutation: true,
    schema: custom.object({
      attributes: custom.object({
        bodyHtml: z.string(),
        name: z.string(),
        subject: z.string().nullish(),
        trackOpens: z.boolean().optional(),
      }),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.templates.create(auth, input);
  },
);
