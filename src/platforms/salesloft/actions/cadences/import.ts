import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'import-cadences',
  {
    operation: 'import',
    resource: 'cadences',
    mutation: true,
    schema: custom.object({
      settings: custom
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
      sharing_settings: custom
        .object({
          team_cadence: z.boolean(),
          shared: z.boolean(),
        })
        .passthrough()
        .optional(),
      cadence_content: custom
        .object({
          cadence_id: z.string(),
          step_groups: z.array(
            custom
              .object({
                day: z.number(),
                due_immediately: z.boolean(),
                automated: z.boolean(),
                reference_id: z.number().optional(),
                steps: z.array(
                  custom
                    .object({
                      enabled: z.boolean(),
                      name: z.string().optional(),
                      type: z.string(),
                      type_settings: custom
                        .object({
                          previous_email_step_group_reference_id: z
                            .number()
                            .optional(),
                          email_template: custom
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
