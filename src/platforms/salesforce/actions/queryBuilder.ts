import { trim } from 'radash';
import { MAX_QUERY_PAGE_SIZE } from '../constants';
import { SalesforceSupportedObjectType } from '../schemas';

declare const brand: unique symbol;

type Brand<T, TBrand extends string> = T & {
  [brand]: TBrand;
};

type SalesforceQuery = Brand<string, 'SalesforceQuery'>;

const formatQuery = (query: string): SalesforceQuery => {
  const cleanedQuery = trim(query.replace(/\n/g, ' '));
  return cleanedQuery.replace(/ +/g, '+') as SalesforceQuery;
};

export const salesforceQueryBuilder: Record<
  string,
  (...args: any[]) => SalesforceQuery
> = {
  list: ({
    objectType,
    cursor,
    relationalSelect,
    limit = MAX_QUERY_PAGE_SIZE,
  }: {
    objectType: SalesforceSupportedObjectType;
    cursor?: number;
    relationalSelect?: string;
    limit?: number;
  }) => {
    const select =
      'SELECT FIELDS(ALL)' + (relationalSelect ? `, ${relationalSelect}` : '');
    const getWhere = () => {
      if (!cursor) {
        return '';
      }
      return `WHERE Id < '${cursor}'`;
    };
    const where = getWhere();
    return formatQuery(`
      ${select}
      FROM ${objectType}
      ${where}
      ORDER BY Id DESC
      LIMIT ${limit}
    `);
  },
  listListView: ({
    objectType,
    cursor,
    limit = MAX_QUERY_PAGE_SIZE,
  }: {
    objectType?: string;
    cursor?: number;
    limit?: number;
  }) => {
    const getWhere = () => {
      if (!cursor) {
        return '';
      }
      return (
        `WHERE Id < '${cursor}'` +
        (objectType ? `AND SobjectType = '${objectType.toUpperCase()}'` : '')
      );
    };
    const where = getWhere();
    return formatQuery(`
      SELECT FIELDS(ALL)
      FROM ListView
      ${where}
      ORDER BY Id DESC
      LIMIT ${limit}
    `);
  },
};
