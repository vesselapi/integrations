import { describe, expect, it } from '@jest/globals';
import zod from 'zod';
import { action } from '../action';

describe('action function', () => {
  it('should return an object with the given name', () => {
    const result = action(
      'testing',
      {
        schema: zod.object({}),
      },
      async () => {
        return {};
      },
    );
    expect(result.name).toBe('testing');
  });
});
