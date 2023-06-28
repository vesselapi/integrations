import { isObject, listify, trim } from 'radash';

export type List = [string, string][];
export type Map = Record<string, string>;
export type Any = List | Map;

export const parse = (value: string | Record<string, string>): List => {
  if (isObject(value)) {
    return listify(value, (k, v) => [k, v]);
  }
  return trim(value, '?')
    .split('&')
    .map((pair) => {
      const [k, v] = pair.split('=');
      return [k, v];
    });
};

export const toArray = (query: Map): List => {
  return listify(query, (k, v) => [k, v]);
};

export const toString = (query: List): string => {
  return query.map((pair) => pair.join('=')).join('&');
};
