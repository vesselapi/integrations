import {
  activeCampaignContact,
  activeCampaignList,
  activeCampaignUser,
} from '@/platforms/active-campaign/schemas';
import { HttpsUrl } from '@/sdk';
import { makeRequestFactory } from '@/sdk/client';
import * as custom from '@/sdk/validators';
import { shake } from 'radash';
import { z } from 'zod';

const request = makeRequestFactory(async (auth, options) => {
  const { answers } = await auth.getMetadata();
  const apiUrl = answers['api-url'] as HttpsUrl;
  return {
    ...options,
    url: `${apiUrl}/${options.url}`,
    headers: {
      ...options.headers,
      'Api-Token': await auth.getToken(),
    },
  };
});

export const client = {
  users: {
    list: request(() => ({
      url: `/api/3/users`,
      method: 'get',
      schema: custom
        .object({
          users: z.array(activeCampaignUser),
        })
        .passthrough(),
    })),
  },
  lists: {
    list: request(({ limit }: { limit?: number }) => ({
      url: `/api/3/lists`,
      method: 'get',
      query: shake({
        limit,
      }),
      schema: custom
        .object({
          lists: z.array(activeCampaignList),
        })
        .passthrough(),
    })),
    find: request(({ id }: { id: string }) => ({
      url: `/api/3/lists/${id}`,
      method: 'get',
      schema: custom
        .object({
          list: activeCampaignList,
        })
        .passthrough(),
    })),
  },
  contacts: {
    list: request(() => ({
      url: `/api/3/contacts`,
      method: 'get',
      schema: custom
        .object({
          contacts: z.array(activeCampaignContact),
        })
        .passthrough(),
    })),
    find: request(({ id }: { id: string }) => ({
      url: `/api/3/contacts/${id}`,
      method: 'get',
      schema: custom
        .object({
          contact: activeCampaignContact,
        })
        .passthrough(),
    })),
    update: request(
      ({
        id,
        properties,
      }: {
        id: string;
        properties: {
          email?: string;
          firstName?: string;
          lastName?: string;
          phone?: string;
        };
      }) => ({
        url: `/api/3/contacts/${id}`,
        method: 'put',
        schema: custom
          .object({
            contact: activeCampaignContact,
          })
          .passthrough(),
        json: {
          contact: shake({
            email: properties.email,
            firstName: properties.firstName,
            lastName: properties.lastName,
            phone: properties.phone,
          }),
        },
      }),
    ),
    create: request(
      (contact: {
        email: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
      }) => ({
        url: `/api/3/contacts`,
        method: 'post',
        schema: custom
          .object({
            contact: activeCampaignContact,
          })
          .passthrough(),
        json: {
          contact,
        },
      }),
    ),
  },
  passthrough: request.passthrough(),
};
