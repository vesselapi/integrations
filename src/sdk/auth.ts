import { OAuth2AuthConfig, StandardAuthConfig } from './types';

export const auth = {
  oauth2: (config: Omit<OAuth2AuthConfig, 'type'>): OAuth2AuthConfig => ({
    ...config,
    type: 'oauth2',
  }),
  standard: (config: Omit<StandardAuthConfig, 'type'>): StandardAuthConfig => ({
    ...config,
    type: 'standard',
  }),
};
