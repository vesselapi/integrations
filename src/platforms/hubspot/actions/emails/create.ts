import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

import { transformEmail } from '@/platforms/hubspot/actions/mappers';
import { hubspotEmailDirectionSchema } from '../../schemas';

export default action(
  'emails-create',
  {
    operation: 'create',
    resource: 'emails',
    mutation: true,
    schema: z.object({
      fromEmail: z.string(),
      toEmails: z.array(z.string()).nonempty(),
      ccEmails: z.array(z.string()),
      bccEmails: z.array(z.string()),
      hsEmailHtml: z.string().optional(),
      hsEmailText: z.string().optional(),
      hsEmailDirection: hubspotEmailDirectionSchema.optional(),
      hsEmailSubject: z.string().optional(),
      hsEmailStatus: z.string().optional(),
      hsTimestamp: z
        .string()
        .transform((v) => new Date(v))
        .optional(),
      hubspotOwnerId: z.string().optional(),
    }),
    scopes: ['sales-email-read'],
  },
  async ({ auth, input }) => {
    const result = await client.emails.create(auth, {
      hs_email_headers: JSON.stringify({
        from: {
          email: input.fromEmail,
        },
        to: input.toEmails.map((email) => ({ email })),
        cc: input.ccEmails.map((email) => ({ email })),
        bcc: input.bccEmails.map((email) => ({ email })),
      }),
      hs_email_html: input.hsEmailHtml,
      hs_email_text: input.hsEmailText,
      hs_email_direction: input.hsEmailDirection,
      hs_email_subject: input.hsEmailSubject,
      hs_email_status: input.hsEmailStatus,
      hs_timestamp: input.hsTimestamp,
      hubspot_owner_id: input.hubspotOwnerId,
    });

    return {
      ...transformEmail(result.data),
      $native: result.$native,
    };
  },
);
