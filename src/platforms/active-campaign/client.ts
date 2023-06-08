import {
  activeCampaignContact,
  activeCampaignList,
  activeCampaignUser,
} from '@/platforms/active-campaign/schemas';
import { HttpsUrl } from '@/sdk';
import { makeRequestFactory } from '@/sdk/client';
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
      method: 'GET',
      schema: z.object({
        users: z.array(activeCampaignUser),
      }),
    })),
  },
  lists: {
    list: request(({ limit }: { limit?: number }) => ({
      url: `/api/3/lists`,
      method: 'GET',
      query: shake({
        limit,
      }),
      schema: z.object({
        lists: z.array(activeCampaignList),
      }),
    })),
    find: request(({ id }: { id: string }) => ({
      url: `/api/3/lists/${id}`,
      method: 'GET',
      schema: z.object({
        list: activeCampaignList,
      }),
    })),
  },
  contacts: {
    list: request(() => ({
      url: `/api/3/contacts`,
      method: 'GET',
      schema: z.object({
        contacts: z.array(activeCampaignContact),
      }),
    })),
    find: request(({ id }: { id: string }) => ({
      url: `/api/3/contacts/${id}`,
      method: 'GET',
      schema: z.object({
        contact: activeCampaignContact,
      }),
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
          $native?: Record<string, unknown>;
        };
      }) => ({
        url: `/api/3/contacts/${id}`,
        method: 'PUT',
        schema: z.object({
          contact: activeCampaignContact,
        }),
        json: {
          contact: shake({
            email: properties.email,
            firstName: properties.firstName,
            lastName: properties.lastName,
            phone: properties.phone,
            ...(properties.$native ?? {}),
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
        $native?: Record<string, unknown>;
      }) => ({
        url: `/api/3/contacts`,
        method: 'POST',
        schema: z.object({
          contact: activeCampaignContact,
        }),
        json: {
          contact: {
            ...contact,
            ...(contact.$native ?? {}),
          },
        },
      }),
    ),
  },
  passthrough: request.passthrough(),
};
