import { formatUrl, makeRequestFactory } from '@/sdk/client';
import { shake } from 'radash';
import { API_VERSION, BASE_URL } from './constants';
import { buildCreateQuery, buildListQuery } from './query-builder';
import {
  ListInput,
  mondayBoardsFields,
  mondayBoardsListResponseSchema,
  mondayBoardsRelationalFields,
  MondayGroupCreate,
  mondayGroupCreateResponseSchema,
  MondayItemCreate,
  mondayItemCreateResponseSchema,
  mondayQueryResponse,
} from './schemas';

const request = makeRequestFactory(async (auth, options) => {
  return {
    ...options,
    url: formatUrl(BASE_URL, options.url),
    headers: {
      ...options.headers,
      Authorization:
        auth.type === 'oauth2'
          ? `Bearer ${await auth.getToken()}`
          : await auth.getToken(),
    },
  };
});

const makeClient = () => {
  return {
    boards: {
      list: request(({ limit, page }: ListInput) => ({
        url: `/${API_VERSION}`,
        method: 'POST',
        schema: mondayBoardsListResponseSchema,
        json: {
          query: buildListQuery({
            module: 'boards',
            fields: mondayBoardsFields,
            relationalFields: mondayBoardsRelationalFields,
            limit,
            page,
          }),
        },
      })),
    },
    groups: {
      create: request(({ board_id, group_name }: MondayGroupCreate) => ({
        url: `/${API_VERSION}`,
        method: 'POST',
        schema: mondayGroupCreateResponseSchema,
        json: {
          query: buildCreateQuery({
            module: 'groups',
            metaFields: shake({ board_id, group_name }),
          }),
        },
      })),
    },
    items: {
      create: request(
        ({
          board_id,
          group_id,
          item_name,
          column_values,
        }: MondayItemCreate) => ({
          url: `/${API_VERSION}`,
          method: 'POST',
          schema: mondayItemCreateResponseSchema,
          json: {
            query: buildCreateQuery({
              module: 'items',
              metaFields: shake({ board_id, group_id, item_name }),
              fields: column_values,
            }),
          },
        }),
      ),
    },
    query: request(({ query }: { query: string }) => ({
      url: `/${API_VERSION}`,
      method: 'POST',
      schema: mondayQueryResponse,
      json: { query },
    })),
    passthrough: request.passthrough(),
  };
};

export default makeClient();
