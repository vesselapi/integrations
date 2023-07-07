import { action } from '@/sdk';
import client from '../../client';
import { MONDAY_MAX_PAGE_SIZE } from '../../constants';
import { listInputSchema } from '../../schemas';

export default action(
  'boards-list',
  {
    operation: 'list',
    resource: 'boards',
    mutation: true,
    schema: listInputSchema.partial(),
    scopes: [],
  },
  async ({ auth, input }) => {
    const limit = input.limit ?? MONDAY_MAX_PAGE_SIZE;
    const page = input.page ?? 1;
    const {
      data: { data, errors },
      $native,
    } = await client.boards.list(auth, { limit, page });
    const nextPageCursor = (data?.boards.length ?? 0) < limit ? null : page + 1;
    return {
      boards: data?.boards ?? null,
      errors: errors ?? null,
      nextPageCursor,
      $native,
    };
  },
);
