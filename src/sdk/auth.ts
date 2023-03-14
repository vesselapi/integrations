import { OAuth2AuthConfig, StandardAuthConfig } from './types';

export const auth = {
  oauth2: (
    config: Omit<OAuth2AuthConfig, 'type' | 'url' | 'default'> & {
      url?: OAuth2AuthConfig['url'];
      default?: boolean;
    },
  ): OAuth2AuthConfig => ({
    ...config,
    url: config.url ?? (() => config.tokenUrl),
    default: config.default ?? false,
    type: 'oauth2',
  }),
  standard: (
    config: Omit<StandardAuthConfig, 'type' | 'default'> & {
      default?: boolean;
    },
  ): StandardAuthConfig => ({
    ...config,
    default: config.default ?? false,
    type: 'standard',
  }),
};
