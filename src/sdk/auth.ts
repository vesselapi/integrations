import { OAuth2AuthConfig, StandardAuthConfig } from './types';

export const auth = {
  oauth2: (
    config: Omit<OAuth2AuthConfig, 'type' | 'url'> & {
      url?: OAuth2AuthConfig['url'];
    },
  ): OAuth2AuthConfig => ({
    ...config,
    url: config.url ?? (() => config.tokenUrl),
    type: 'oauth2',
  }),
  standard: (config: Omit<StandardAuthConfig, 'type'>): StandardAuthConfig => ({
    ...config,
    type: 'standard',
  }),
};
