import * as custom from '@/sdk/validators';
import { z } from 'zod';

const outreachRelationship = custom
  .object({
    data: custom
      .object({
        id: z.string(),
      })
      .passthrough(),
  })
  .passthrough();

export const outreachPaginatedResponse = custom
  .object({
    links: custom
      .object({
        next: z.string().nullish(),
      })
      .passthrough()
      .nullish(),
  })
  .passthrough();

export const outreachProspect = custom
  .object({
    id: z.number(),
    attributes: custom
      .object({
        firstName: z.string().nullable(),
        lastName: z.string().nullable(),
        occupation: z.string().nullable(),
        addressCity: z.string().nullable(),
        addressCountry: z.string().nullable(),
        addressState: z.string().nullable(),
        addressStreet: z.string().nullable(),
        addressStreet2: z.string().nullable(),
        addressZip: z.string().nullable(),
        emails: z.array(z.string()).nullable(),
        homePhones: z.array(z.string()).nullable(),
        mobilePhones: z.array(z.string()).nullable(),
        otherPhones: z.array(z.string()).nullable(),
        workPhones: z.array(z.string()).nullable(),
        clickCount: z.number().nullable(),
        openCount: z.number().nullable(),
        replyCount: z.number().nullable(),
        createdAt: custom.date(),
        updatedAt: custom.date(),
      })
      .passthrough(),
    relationships: custom
      .object({
        owner: outreachRelationship.nullish(),
        account: outreachRelationship.nullish(),
      })
      .passthrough(),
  })
  .passthrough();

export const outreachAccount = custom
  .object({
    id: z.number(),
    attributes: custom
      .object({
        companyType: z.string().nullable(),
        name: z.string().nullable(),
        description: z.string().nullable(),
        domain: z.string().nullable(),
        locality: z.string().nullable(),
        numberOfEmployees: z.number().nullable(),
        websiteUrl: z.string().nullable(),
        industry: z.string().nullable(),
        createdAt: custom.date(),
        updatedAt: custom.date(),
      })
      .passthrough(),
    relationships: custom
      .object({
        owner: outreachRelationship,
      })
      .passthrough(),
  })
  .passthrough();

export const outreachEmailAddress = custom
  .object({
    id: z.number(),
    attributes: custom.object({}).passthrough(),
    relationships: custom.object({}).passthrough(),
  })
  .passthrough();

export const outreachUser = custom
  .object({
    id: z.number(),
    attributes: custom
      .object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        createdAt: custom.date(),
        updatedAt: custom.date(),
      })
      .passthrough(),
    relationships: custom.object({}).passthrough(),
  })
  .passthrough();

export const outreachListUsersResponse = z.intersection(
  custom.object({
    data: z.array(outreachUser),
  }),
  outreachPaginatedResponse,
);

export const outreachMailbox = custom
  .object({
    id: z.number(),
    attributes: custom
      .object({
        email: z.string(),
        userId: z.number(),
        createdAt: custom.date(),
        updatedAt: custom.date(),
      })
      .passthrough(),
  })
  .passthrough();

export const outreachSequence = custom
  .object({
    id: z.number(),
    attributes: custom
      .object({
        name: z.string(),
        bounceCount: z.number(),
        clickCount: z.number(),
        deliverCount: z.number(),
        description: z.string().nullable(),
        enabled: z.boolean(),
        openCount: z.number(),
        optOutCount: z.number(),
        replyCount: z.number(),
        scheduleCount: z.number(),
        sequenceStepCount: z.number(),
        tags: z.array(z.string()),
        createdAt: custom.date(),
        updatedAt: custom.date(),
      })
      .passthrough(),
    relationships: custom.object({}).passthrough(),
  })
  .passthrough();

export const outreachSequenceState = custom
  .object({
    id: z.number(),
    attributes: custom.object({}).passthrough(),
    relationships: custom
      .object({
        prospect: outreachRelationship,
        sequence: outreachRelationship,
        mailbox: outreachRelationship,
      })
      .passthrough(),
  })
  .passthrough();

export const outreachMailing = custom
  .object({
    id: z.number(),
    attributes: custom
      .object({
        bodyHtml: z.string().nullable(),
        bodyText: z.string().nullable(),
        bouncedAt: z.string().nullable(),
        clickCount: z.number().nullable(),
        clickedAt: z.string().nullable(),
        deliveredAt: z.string().nullable(),
        openCount: z.number().nullable(),
        openedAt: z.string().nullable(),
        repliedAt: z.string().nullable(),
        subject: z.string().nullable(),
        createdAt: custom.date(),
        updatedAt: custom.date(),
      })
      .passthrough(),
    relationships: custom
      .object({
        user: outreachRelationship.nullable(),
        sequence: outreachRelationship.nullable(),
      })
      .passthrough(),
  })
  .passthrough();

export const outreachSequenceStep = custom.passthrough({
  id: z.number(),
});

export const outreachTemplate = custom.passthrough({
  id: z.number(),
});

export const outreachSequenceTemplate = custom.passthrough({
  id: z.number(),
});

export type OutreachProspect = z.infer<typeof outreachProspect>;
export type OutreachAccount = z.infer<typeof outreachAccount>;
export type OutreachEmailAddress = z.infer<typeof outreachEmailAddress>;
export type OutreachUser = z.infer<typeof outreachUser>;
export type OutreachListUsersResponse = z.infer<
  typeof outreachListUsersResponse
>;
export type OutreachMailbox = z.infer<typeof outreachMailbox>;
export type OutreachSequence = z.infer<typeof outreachSequence>;
export type OutreachSequenceState = z.infer<typeof outreachSequenceState>;
export type OutreachMailing = z.infer<typeof outreachMailing>;
export type OutreachSequenceStep = z.infer<typeof outreachSequenceStep>;
export type OutreachTemplate = z.infer<typeof outreachTemplate>;
export type OutreachSequenceTemplate = z.infer<typeof outreachSequenceTemplate>;
