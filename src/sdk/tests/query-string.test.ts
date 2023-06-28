import { describe } from '@jest/globals';
import * as qs from '../query-string';

const TEST_CASES = [
  'name=vessel',
  'name=vessel',
  'list[]=one&list[]=two&name=vessel',
];

describe('query string module', () => {
  test.each(TEST_CASES)(
    'parse the query string (%s) then convert back to string without destroying the original query string',
    (original) => {
      const parsed = qs.parse(original);
      const stringified = qs.toString(parsed);
      expect(stringified).toBe(original);
    },
  );

  describe('parse function', () => {
    it('should parse query string object into list', () => {
      const result = qs.toArray({
        name: 'vessel',
        size: 'lg',
      });
      expect(result).toEqual([
        ['name', 'vessel'],
        ['size', 'lg'],
      ]);
    });
  });
});
