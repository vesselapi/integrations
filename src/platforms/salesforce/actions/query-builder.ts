import { sift, trim, unique } from 'radash';
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

const buildRelationalSelectClause = (
  relationalSelect?: Partial<Record<SalesforceSupportedObjectType, string>>,
  associations?: SalesforceSupportedObjectType[],
) => {
  if (!relationalSelect || !associations) return undefined;
  const clauses = unique(
    sift(associations.map((objectType) => relationalSelect[objectType])),
  );
  if (clauses.length === 0) return undefined;
  return clauses.join(', ');
};

export const salesforceQueryBuilder: Record<
  string,
  (...args: any[]) => SalesforceQuery
> = {
  find: ({
    id,
    objectType,
    relationalSelect,
    associations,
  }: {
    id: string;
    objectType: SalesforceSupportedObjectType;
    relationalSelect?: Partial<Record<SalesforceSupportedObjectType, string>>;
    associations?: SalesforceSupportedObjectType[];
  }) => {
    const selectClauses = sift([
      'SELECT FIELDS(ALL)',
      buildRelationalSelectClause(relationalSelect, associations),
    ]);
    return formatQuery(`
      ${selectClauses.join(', ')}
      FROM ${objectType}
      WHERE Id = '${id}'
    `);
  },
  list: ({
    objectType,
    cursor,
    limit = MAX_QUERY_PAGE_SIZE,
    relationalSelect,
    associations,
  }: {
    objectType: SalesforceSupportedObjectType;
    cursor?: number;
    limit?: number;
    relationalSelect?: Partial<Record<SalesforceSupportedObjectType, string>>;
    associations?: SalesforceSupportedObjectType[];
  }) => {
    const selectClauses = sift([
      'SELECT FIELDS(ALL)',
      buildRelationalSelectClause(relationalSelect, associations),
    ]);
    const getWhere = () => {
      if (!cursor) {
        return '';
      }
      return `WHERE Id < '${cursor}'`;
    };
    const where = getWhere();
    return formatQuery(`
      ${selectClauses.join(', ')}
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
