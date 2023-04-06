import { HttpsUrl } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export type RingcentralAccountType = 'production' | 'sandbox';
export interface RingcentralAuthAnswers extends Record<string, string> {
  accountType: RingcentralAccountType;
}
export const ringcentralUrlsByAccountType: Record<
  RingcentralAccountType,
  HttpsUrl
> = {
  production: `https://platform.ringcentral.com/restapi`,
  sandbox: `https://platform.devtest.ringcentral.com/restapi`,
};

export const listResponseSchema = (itemSchema: z.ZodSchema<any>) =>
  z.object({
    records: z.array(itemSchema).optional(),
    navigation: z
      .object({
        firstPage: z.object({
          uri: z.string(),
        }),
        lastPage: z.object({
          uri: z.string(),
        }),
      })
      .optional(),
    paging: z
      .object({
        page: z.number(),
        totalPages: z.number(),
        perPage: z.number(),
        totalElements: z.number(),
        pageStart: z.number(),
        pageEnd: z.number(),
      })
      .optional(),
  });

export const ringcentralExtensionSchema = z.object({
  id: z.string(),
  extensionNumber: z.string(),
  contact: z
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
  permissions: z.object({
    admin: z.object({
      enabled: z.boolean(),
    }),
    internationalCalling: z.object({
      enabled: z.boolean(),
    }),
  }),
});

export const ringcentralCallLogSchema = z.object({
  id: z.string(),
  sessionId: z.string(),
  startTime: custom.date(),
  duration: z.number(),
  type: z.string(),
  direction: z.enum(['Inbound', 'Outbound']),
  action: z.string(),
  result: z.string(),
  from: z.object({
    phoneNumber: custom.formattedPhoneNumber(),
    extensionId: z.string().optional(),
    name: z.string().optional(),
  }),
  to: z.object({
    phoneNumber: custom.formattedPhoneNumber(),
    extensionId: z.string().optional(),
    name: z.string().optional(),
  }),
});

export const ringcentralContactSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  company: z.string().optional(),
  email: z.string().optional(),
  businessPhone: custom.formattedPhoneNumber(),
});

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

export const ringcentralRingOutStartSchema = z.object({
  extensionId: z.string().default('~'),
  from: z.object({
    phoneNumber: custom.formattedPhoneNumber(),
  }),
  to: z.object({
    phoneNumber: custom.formattedPhoneNumber(),
  }),
  playPrompt: z.boolean().optional(),
  callerId: z
    .object({
      phoneNumber: custom.formattedPhoneNumber(),
    })
    .optional(),
  callId: z.string().optional(),
  sipInfo: z
    .array(
      z.object({
        transport: z.string(),
        uri: z.string(),
        username: z.string(),
        password: z.string(),
      }),
    )
    .optional(),
});

export const ringcentralRingOutStatusSchema = z.object({
  uri: z.string(),
  id: z.string(),
  status: z.object({
    callStatus: z.string(),
    callerStatus: z.string(),
    calleeStatus: z.string(),
  }),
});

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
