import * as custom from '@/sdk/validators';
import { describe, it } from '@jest/globals';
import { action } from '../action';

describe('action function', () => {
  it('should return an object with the given name', () => {
    const result = action(
      'testing',
      {
        operation: 'find',
        resource: 'testing',
        schema: custom.object({}),
      },
      async () => {
        return {};
      },
    );
  });
});
