import { describe, it } from '@jest/globals';
import { z } from 'zod';
import { action } from '../action';

describe('action function', () => {
  it('should return an object with the given name', () => {
    const result = action(
      'testing',
      {
        schema: z.object({}),
      },
      async () => {
        return {};
      },
    );
  });
});
