import { OAuth2AuthConfig } from '@/sdk';
import { describe, it } from '@jest/globals';
import outreach from '..';

describe('outreach platform oauth', () => {
  describe('url function', () => {
    it('should return scopes space separated and encoded', () => {
      const auth = outreach.auth.find(
        (x) => x.type === 'oauth2',
      ) as OAuth2AuthConfig;
      const url = auth.url({
        answers: {},
        scopes: ['alpha', 'omega'],
        clientId: 'clientid',
        redirectUrl: 'https://localhost:20000',
        state: 'state',
      });
      expect(url).toMatch(/scope=alpha%20omega/g);
    });
  });
});
