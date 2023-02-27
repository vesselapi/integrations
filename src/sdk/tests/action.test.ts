import { describe, expect, it } from '@jest/globals';
import { action } from '../action';

describe('action function', () => {
  it('should return an object with the given name', () => {
    const result = action('testing', async () => {});
    expect(result.name).toBe('testing');
  });
});
