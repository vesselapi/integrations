import { isArray, sift, trim, unique } from 'radash';
import { MAX_QUERY_PAGE_SIZE } from '../constants';
import { SalesforceSupportedObjectType } from '../schemas';

declare const brand: unique symbol;

type Brand<T, TBrand extends string> = T & {
  [brand]: TBrand;
};

type SalesforceQuery = Brand<string, 'SalesforceQuery'>;

export const formatQuery = (query: string): SalesforceQuery => {
  return trim(query.replace(/[\s\n]+/g, ' ')) as SalesforceQuery;
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

export const salesforceQueryBuilder = {
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
    where,
    associations,
  }: {
    objectType: SalesforceSupportedObjectType;
    cursor?: string;
    limit?: number;
    relationalSelect?: Partial<Record<SalesforceSupportedObjectType, string>>;
    where?: string;
    associations?: SalesforceSupportedObjectType[];
  }) => {
    const selectClauses = sift([
      'SELECT FIELDS(ALL)',
      buildRelationalSelectClause(relationalSelect, associations),
    ]);
    const getWhereClause = () => {
      const cursorClause = cursor && `Id < '${cursor}'`;
      const clauses = sift([cursorClause, where]);
      if (clauses.length === 0) return '';
      return `WHERE ${clauses.join(' AND ')}`;
    };
    const whereClause = getWhereClause();
    return formatQuery(`
      ${selectClauses.join(', ')}
      FROM ${objectType}
      ${whereClause}
      ORDER BY Id DESC
      LIMIT ${limit}
    `);
  },
  batchRead: ({
    ids,
    objectType,
    relationalSelect,
    associations,
    cursor,
    limit = MAX_QUERY_PAGE_SIZE,
  }: {
    ids: string[];
    objectType: SalesforceSupportedObjectType;
    relationalSelect?: Partial<Record<SalesforceSupportedObjectType, string>>;
    associations?: SalesforceSupportedObjectType[];
    cursor?: string;
    limit?: number;
  }) => {
    const selectClauses = sift([
      'SELECT FIELDS(ALL)',
      buildRelationalSelectClause(relationalSelect, associations),
    ]);
    return formatQuery(`
      ${selectClauses.join(', ')}
      FROM ${objectType}
      WHERE Id IN ('${ids.join("','")}') ${cursor ? `AND Id < '${cursor}'` : ''}
      ORDER BY Id DESC
      LIMIT ${limit}
    `);
  },
  listListView: ({
    objectType,
    cursor,
    limit = MAX_QUERY_PAGE_SIZE,
  }: {
    objectType?: SalesforceSupportedObjectType;
    cursor?: string;
    limit?: number;
  }) => {
    const getWhere = () => {
      if (!cursor) {
        return '';
      }
      return (
        `WHERE Id < '${cursor}'` +
        (objectType ? `AND SobjectType = '${objectType}'` : '')
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
  search: ({
    where,
    objectType,
    relationalSelect,
    associations,
    cursor,
    limit = MAX_QUERY_PAGE_SIZE,
  }: {
    where: Record<string, string | string[]>;
    objectType: SalesforceSupportedObjectType;
    relationalSelect?: Partial<Record<SalesforceSupportedObjectType, string>>;
    associations?: SalesforceSupportedObjectType[];
    cursor?: string;
    limit?: number;
  }) => {
    const selectClauses = sift([
      'SELECT FIELDS(ALL)',
      buildRelationalSelectClause(relationalSelect, associations),
    ]);
    const whereClause = Object.entries(where)
      .map(([key, value]) => {
        if (isArray(value)) return `${key} IN ('${value.join("','")}')`;
        return `${key} = '${value}'`;
      })
      .join(' AND ');
    return formatQuery(`
      ${selectClauses.join(', ')}
      FROM ${objectType}
      WHERE ${whereClause} ${cursor ? `AND Id < '${cursor}'` : ''}
      ORDER BY Id DESC
      LIMIT ${limit}
    `);
  },
};
