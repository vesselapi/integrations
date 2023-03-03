import { isArray, merge } from 'radash';
import {
  Action,
  OAuth2AuthConfig,
  Platform,
  PlatformClient,
  PlatformDisplayConfig,
  StandardAuthConfig,
} from './types';

export type PlatformOptions = {
  auth: StandardAuthConfig | OAuth2AuthConfig;
  client: PlatformClient;
  actions: Action<any>[];
  display: PlatformDisplayConfig;
};

export const platform = (id: string, options: PlatformOptions): Platform => {
  let actions: Action<any>[] = options.actions;
  return {
    id,
    auth: options.auth,
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
