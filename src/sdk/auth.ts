import { AuthQuestion, OAuth2AuthConfig, StandardAuthConfig } from './types';

export const auth = {
  oauth2: (
    config: Omit<OAuth2AuthConfig, 'type' | 'url' | 'default' | 'questions'> & {
      url?: OAuth2AuthConfig['url'];
      default?: boolean;
      questions?: AuthQuestion[];
    },
  ): OAuth2AuthConfig => ({
    ...config,
    url: config.url ?? (() => config.tokenUrl),
    default: config.default ?? false,
    type: 'oauth2',
    questions: config.questions ?? [],
  }),
  standard: (
    config: Omit<StandardAuthConfig, 'type' | 'default' | 'questions'> & {
      default?: boolean;
      questions?: AuthQuestion[];
    },
  ): StandardAuthConfig => ({
    ...config,
    default: config.default ?? false,
    type: 'standard',
    questions: config.questions ?? [],
  }),
};
