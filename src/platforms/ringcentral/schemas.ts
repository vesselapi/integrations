import * as custom from '@/sdk/validators';
import { z } from 'zod';

export const listResponseSchema = (itemSchema: z.ZodSchema<any>) =>
  custom
    .object({
      records: z.array(itemSchema).optional(),
      navigation: custom
        .object({
          firstPage: custom.object({
            uri: z.string(),
          }),
          lastPage: custom.object({
            uri: z.string(),
          }),
        })
        .optional(),
      paging: custom
        .object({
          page: z.number(),
          totalPages: z.number(),
          perPage: z.number(),
          totalElements: z.number(),
          pageStart: z.number(),
          pageEnd: z.number(),
        })
        .optional(),
    })
    .passthrough();

export const ringcentralExtensionSchema = custom
  .object({
    id: z.string(),
    extensionNumber: z.string(),
    contact: custom
      .object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        company: z.string(),
        jobTitle: z.string(),
        businessPhone: z.string(),
      })
      .optional(),
    status: z.string(),
    type: z.string(),
    permissions: custom
      .object({
        admin: custom.object({
          enabled: z.boolean(),
        }),
        internationalCalling: custom.object({
          enabled: z.boolean(),
        }),
      })
      .passthrough(),
  })
  .passthrough();

export const ringcentralCallLogSchema = custom
  .object({
    id: z.string(),
    sessionId: z.string(),
    startTime: custom.date(),
    duration: z.number(),
    type: z.string(),
    direction: z.enum(['Inbound', 'Outbound']),
    action: z.string(),
    result: z.string(),
    from: custom.object({
      phoneNumber: custom.formattedPhoneNumber(),
      extensionId: z.string().optional(),
      name: z.string().optional(),
    }),
    to: custom.object({
      phoneNumber: custom.formattedPhoneNumber(),
      extensionId: z.string().optional(),
      name: z.string().optional(),
    }),
  })
  .passthrough();

export const ringcentralContactSchema = custom
  .object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    company: z.string().optional(),
    email: z.string().optional(),
    businessPhone: custom.formattedPhoneNumber(),
  })
  .passthrough();

export const ringcentralContactCreateSchema = ringcentralContactSchema
  .partial()
  .required({
    firstName: true,
    lastName: true,
  })
  .omit({
    id: true,
  });
export const ringcentralContactUpdateSchema = ringcentralContactSchema
  .partial()
  .required({
    id: true,
  });

export const ringcentralRingOutStartSchema = custom
  .object({
    extensionId: z.string().default('~'),
    from: custom.object({
      phoneNumber: custom.formattedPhoneNumber(),
    }),
    to: custom.object({
      phoneNumber: custom.formattedPhoneNumber(),
    }),
    playPrompt: z.boolean().optional(),
    callerId: custom
      .object({
        phoneNumber: custom.formattedPhoneNumber(),
      })
      .optional(),
    callId: z.string().optional(),
    sipInfo: z
      .array(
        custom.object({
          transport: z.string(),
          uri: z.string(),
          username: z.string(),
          password: z.string(),
        }),
      )
      .optional(),
  })
  .passthrough();

export const ringcentralRingOutStatusSchema = custom
  .object({
    uri: z.string(),
    id: z.string(),
    status: custom.object({
      callStatus: z.string(),
      callerStatus: z.string(),
      calleeStatus: z.string(),
    }),
  })
  .passthrough();

export type RingcentralExtension = z.infer<typeof ringcentralExtensionSchema>;
export type RingcentralCallLog = z.infer<typeof ringcentralCallLogSchema>;
export type RingcentralContact = z.infer<typeof ringcentralContactSchema>;
export type RingcentralContactCreate = z.infer<
  typeof ringcentralContactCreateSchema
>;
export type RingcentralContactUpdate = z.infer<
  typeof ringcentralContactUpdateSchema
>;
export type RingcentralRingOutStart = z.infer<
  typeof ringcentralRingOutStartSchema
>;
export type RingcentralRingOutStatus = z.infer<
  typeof ringcentralRingOutStatusSchema
>;
export type AnyRingcentralObject =
  | RingcentralExtension
  | RingcentralCallLog
  | RingcentralContact;

export type FindObjectInput = { id: string };
export type ListObjectInput = { page?: number; perPage?: number };
const anyListResponseSchema = listResponseSchema(z.any());
export type RingcentralListResponse = z.infer<typeof anyListResponseSchema>;
