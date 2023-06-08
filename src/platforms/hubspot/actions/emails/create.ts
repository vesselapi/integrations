import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
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
    schema: z
      .object({
        fromEmail: z.string(),
        toEmails: z.array(z.string()).nonempty(),
        ccEmails: z.array(z.string()),
        bccEmails: z.array(z.string()),
        hsEmailHtml: z.string(),
        hsEmailText: z.string(),
        hsEmailDirection: hubspotEmailDirectionSchema,
        hsEmailSubject: z.string(),
        hsEmailStatus: z.string(),
        hsTimestamp: custom.date(),
        hubspotOwnerId: z.string(),
      })
      .partial(),
    scopes: ['sales-email-read'],
  },
  async ({ auth, input }) => {
    const result = await client.emails.create(auth, {
      hs_email_headers: JSON.stringify({
        from: {
          email: input.fromEmail,
        },
        to: input.toEmails?.map((email) => ({ email })) ?? [],
        cc: input.ccEmails?.map((email) => ({ email })) ?? [],
        bcc: input.bccEmails?.map((email) => ({ email })) ?? [],
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
