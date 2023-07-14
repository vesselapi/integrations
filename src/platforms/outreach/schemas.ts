import * as custom from '@/sdk/validators';
import { z } from 'zod';

const outreachRelationship = z.object({
  data: z.object({
    id: z.string(),
  }),
});
export const outreachPaginatedResponse = z.object({
  links: z
    .object({
      next: z.string().nullish(),
    })

    .nullish(),
});

export const outreachProspect = z.object({
  id: z.number(),
  attributes: z.object({
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
  }),
  relationships: z.object({
    owner: outreachRelationship.nullish(),
    account: outreachRelationship.nullish(),
  }),
});

export const outreachAccount = z.object({
  id: z.number(),
  attributes: z.object({
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
  }),
  relationships: z.object({
    owner: outreachRelationship,
  }),
});

export const outreachEmailAddress = z.object({
  id: z.number(),
  attributes: z.object({}),
  relationships: z.object({}),
});

export const outreachUser = z.object({
  id: z.number(),
  attributes: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    createdAt: custom.date(),
    updatedAt: custom.date(),
  }),
  relationships: z.object({}),
});

export const outreachListUsersResponse = z.intersection(
  z.object({
    data: z.array(outreachUser),
  }),
  outreachPaginatedResponse,
);

export const outreachMailbox = z.object({
  id: z.number(),
  attributes: z.object({
    email: z.string(),
    userId: z.number(),
    createdAt: custom.date(),
    updatedAt: custom.date(),
  }),
});

export const outreachSequence = z.object({
  id: z.number(),
  attributes: z.object({
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
  }),
  relationships: z.object({}),
});

export const outreachSequenceState = z.object({
  id: z.number(),
  attributes: z.object({}),
  relationships: z.object({
    prospect: outreachRelationship,
    sequence: outreachRelationship,
    mailbox: outreachRelationship,
  }),
});

export const outreachMailing = z.object({
  id: z.number(),
  attributes: z.object({
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
  }),
  relationships: z.object({
    user: outreachRelationship.nullable(),
    sequence: outreachRelationship.nullable(),
  }),
});

export const outreachSequenceStep = custom.object({
  id: z.number(),
  attributes: z.object({
    bounceCount: z.number().nullable(),
    clickCount: z.number().nullable(),
    createdAt: custom.date().nullable(),
    date: custom.date().nullable(),
    deliverCount: z.number().nullable(),
    displayName: z.string().nullable(),
    failureCount: z.number().nullable(),
    interval: z.number().nullable(),
    negativeReplyCount: z.number().nullable(),
    neutralReplyCount: z.number().nullable(),
    openCount: z.number().nullable(),
    optOutCount: z.number().nullable(),
    order: z.number().nullable(),
    positiveReplyCount: z.number().nullable(),
    replyCount: z.number().nullable(),
    scheduleCount: z.number().nullable(),
    stepType: z.string().nullable(),
    taskAutoskipDelay: z.number().nullable(),
    taskNote: z.string().nullable(),
    updatedAt: custom.date().nullable(),
  }),
  relationships: z.object({
    sequence: outreachRelationship.nullable(),
    sequenceTemplates: outreachRelationship.nullable(),
  }),
});

export const outreachTemplate = custom.object({
  id: z.number(),
  attributes: z.object({
    archived: z.boolean().nullable(),
    archivedAt: custom.date().nullable(),
    bccRecipients: z.string().nullable(),
    bodyHtml: z.string().nullable(),
    bodyText: z.string().nullable(),
    bounceCount: z.number().nullable(),
    ccRecipients: z.string().nullable(),
    clickCount: z.number().nullable(),
    createdAt: custom.date().nullable(),
    deliverCount: z.number().nullable(),
    failureCount: z.number().nullable(),
    lastUsedAt: custom.date().nullable(),
    name: z.string().nullable(),
    negativeReplyCount: z.number().nullable(),
    neutralReplyCount: z.number().nullable(),
    openCount: z.number().nullable(),
    optOutCount: z.number().nullable(),
    positiveReplyCount: z.number().nullable(),
    replyCount: z.number().nullable(),
    scheduleCount: z.number().nullable(),
    shareType: z.string().nullable(),
    subject: z.string().nullable(),
    tags: z.string().nullable(),
    toRecipients: z.string().nullable(),
    trackLinks: z.boolean().nullable(),
    trackOpens: z.boolean().nullable(),
    updatedAt: custom.date().nullable(),
  }),
});

export const outreachSequenceTemplate = custom.object({
  id: z.number(),
  attributes: z.object({
    bounceCount: z.number().nullable(),
    clickCount: z.number().nullable(),
    createdAt: custom.date().nullable(),
    deliverCount: z.number().nullable(),
    enabled: z.boolean().nullable(),
    enabledAt: custom.date().nullable(),
    failureCount: z.number().nullable(),
    isReply: z.boolean().nullable(),
    negativeReplyCount: z.number().nullable(),
    neutralReplyCount: z.number().nullable(),
    openCount: z.number().nullable(),
    optOutCount: z.number().nullable(),
    positiveReplyCount: z.number().nullable(),
    replyCount: z.number().nullable(),
    scheduleCount: z.number().nullable(),
    updatedAt: custom.date().nullable(),
  }),
  relationships: z.object({
    template: outreachTemplate.nullable(),
  }),
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
