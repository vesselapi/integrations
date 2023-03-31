import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'create-template',
  {
    operation: 'create',
    resource: 'templates',
    mutation: true,
    schema: z.object({
      attributes: z.object({
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
