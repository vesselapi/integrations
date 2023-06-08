import { last } from 'radash';

export const getNextCursor = ({
  records,
  limit,
}: {
  records: { Id: string }[];
  limit: number;
}) => {
  if (records.length < limit) {
    return null;
  }
  return last(records)?.Id;
};
