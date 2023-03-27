import * as custom from '@/sdk/validators';
import { z } from 'zod';

const outreachRelationship = z
  .object({
    data: z
      .object({
        id: z.string(),
      })
      .passthrough(),
  })
  .passthrough();

export const outreachPaginatedResponse = z
  .object({
    links: z
      .object({
        next: z.string().nullish(),
      })
      .passthrough()
      .nullish(),
  })
  .passthrough();

export const outreachProspect = z
  .object({
    id: z.number(),
    attributes: z
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
    relationships: z
      .object({
        owner: outreachRelationship.nullish(),
        account: outreachRelationship.nullish(),
      })
      .passthrough(),
  })
  .passthrough();

export const outreachAccount = z
  .object({
    id: z.number(),
    attributes: z
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
    relationships: z
      .object({
        owner: outreachRelationship,
      })
      .passthrough(),
  })
  .passthrough();

export const outreachEmailAddress = z
  .object({
    id: z.number(),
    attributes: z.object({}).passthrough(),
    relationships: z.object({}).passthrough(),
  })
  .passthrough();

export const outreachUser = z
  .object({
    id: z.number(),
    attributes: z
      .object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        createdAt: custom.date(),
        updatedAt: custom.date(),
      })
      .passthrough(),
    relationships: z.object({}).passthrough(),
  })
  .passthrough();

export const outreachListUsersResponse = z.intersection(
  z.object({
    data: z.array(outreachUser),
  }),
  outreachPaginatedResponse,
);

export const outreachMailbox = z
  .object({
    id: z.number(),
    attributes: z
      .object({
        email: z.string(),
        userId: z.number(),
        createdAt: custom.date(),
        updatedAt: custom.date(),
      })
      .passthrough(),
  })
  .passthrough();

export const outreachSequence = z
  .object({
    id: z.number(),
    attributes: z
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
    relationships: z.object({}).passthrough(),
  })
  .passthrough();

export const outreachSequenceState = z
  .object({
    id: z.number(),
    attributes: z.object({}).passthrough(),
    relationships: z
      .object({
        prospect: outreachRelationship,
        sequence: outreachRelationship,
        mailbox: outreachRelationship,
      })
      .passthrough(),
  })
  .passthrough();

export const outreachMailing = z
  .object({
    id: z.number(),
    attributes: z
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
    relationships: z
      .object({
        user: outreachRelationship.nullable(),
        sequence: outreachRelationship.nullable(),
      })
      .passthrough(),
  })
  .passthrough();
