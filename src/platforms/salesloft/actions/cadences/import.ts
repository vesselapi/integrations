import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'import-cadences',
  {
    operation: 'import',
    resource: 'cadences',
    mutation: true,
    schema: z.object({
      settings: z
        .object({
          name: z.string(),
          target_daily_people: z.number(),
          remove_replied: z.boolean(),
          remove_bounced: z.boolean(),
          external_identifier: z.string().optional(),
          cadence_function: z.string(),
        })
        .passthrough()
        .optional(),
      sharing_settings: z
        .object({
          team_cadence: z.boolean(),
          shared: z.boolean(),
        })
        .passthrough()
        .optional(),
      cadence_content: z
        .object({
          cadence_id: z.string(),
          step_groups: z.array(
            z
              .object({
                day: z.number(),
                due_immediately: z.boolean(),
                automated: z.boolean(),
                reference_id: z.number().optional(),
                steps: z.array(
                  z
                    .object({
                      enabled: z.boolean(),
                      name: z.string().optional(),
                      type: z.string(),
                      type_settings: z
                        .object({
                          previous_email_step_group_reference_id: z
                            .number()
                            .optional(),
                          email_template: z
                            .object({
                              title: z.string(),
                              subject: z.string().optional(),
                              body: z.string(),
                              open_tracking: z.boolean().optional(),
                              click_tracking: z.boolean().optional(),
                            })
                            .passthrough(),
                        })
                        .passthrough(),
                    })
                    .passthrough(),
                ),
              })
              .passthrough(),
          ),
        })
        .passthrough()
        .optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.cadences.import(auth, input);
  },
);
