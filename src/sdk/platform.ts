import { isArray, merge, unique } from 'radash';
import {
  Action,
  OAuth2AuthConfig,
  Platform,
  PlatformClient,
  PlatformDisplayConfig,
  StandardAuthConfig,
} from './types';

export type PlatformOptions = {
  auth:
    | StandardAuthConfig
    | OAuth2AuthConfig
    | (StandardAuthConfig | OAuth2AuthConfig)[];
  client: PlatformClient;
  actions: Action<any>[];
  display: PlatformDisplayConfig;
};

export const platform = (id: string, options: PlatformOptions): Platform => {
  let actions: Action<any>[] = options.actions;
  const auths = isArray(options.auth)
    ? options.auth
    : [
        {
          ...options.auth,
          default: true,
        },
      ];
  const types = auths.map((a) => a.type);
  if (unique(types).length !== auths.length) {
    throw new Error(
      'Multiple auth strategies of the same type were provided: ' +
        types.join(', '),
    );
  }
  const defaultAuth = auths.filter((a) => a.default === true);
  if (defaultAuth.length !== 1) {
    throw new Error(
      'One and only one auth must be the default when using multiple auth types',
    );
  }
  return {
    id,
    auth: auths,
    client: options.client,
    display: options.display,
    actions: {
      register: (listOrItem) => {
        actions = merge(
          actions,
          isArray(listOrItem) ? listOrItem : [listOrItem],
          (x) => x.name,
        ).slice();
      },
      find: (info) => {
        return actions.find((x) => x.name === info.name) ?? null;
      },
    },
    fetch: async () => {
      // TODO: Implement with retries/auth
      return {} as any;
    },
  };
};
