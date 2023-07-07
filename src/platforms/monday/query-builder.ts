import { isNumber } from 'radash';
import { MondayModule } from './schemas';

export function buildListQuery({
  module,
  fields,
  relationalFields,
  limit,
  page,
}: {
  module: MondayModule;
  fields: string[];
  relationalFields: Record<string, string[]>;
  limit: number;
  page: number;
}) {
  const queryRelationalFields = Object.entries(relationalFields)
    .map(([key, value]) => {
      return `${key} { ${value.join(' ')}}`;
    })
    .join(' ');
  return `query {
    ${module} (limit: ${limit} page: ${page}) {
      ${fields.join(' ')}
      ${queryRelationalFields}
    }
  }`;
}

export function buildCreateQuery({
  module,
  metaFields,
  fields,
}: {
  module: MondayModule;
  metaFields: Record<string, string | number>;
  fields?: Record<string, string | number>;
}) {
  const queryMetaFields = Object.entries(metaFields)
    .map(([key, value]) => {
      return isNumber(value) ? `${key}: ${value}` : `${key}: "${value}"`;
    })
    .join(', ');
  const queryColumnValues =
    fields &&
    Object.entries(fields)
      .map(([key, value]) => {
        return isNumber(value)
          ? `\\\"${key}\\\": ${value}`
          : `\\\"${key}\\\": \\\"${value}\\\"`;
      })
      .join(', ');
  return `mutation {
    create_${module.replace(/s$/, '')} (
      ${queryMetaFields},
      ${fields === undefined ? '' : `column_values: "{${queryColumnValues}}"`}
    ) {
        id
    }
  }`;
}
