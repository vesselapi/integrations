import { isArray, merge } from 'radash';
import { Action, AuthConfig, Platform, PlatformClient } from './types';

export type PlatformDisplayOptions = {
  name: string;
  icon: string;
};

export type PlatformOptions = {
  auth: AuthConfig;
  client: PlatformClient;
  actions: Action<any>[];
  display: PlatformDisplayOptions;
};

export const platform = (id: string, options: PlatformOptions): Platform => {
  let actions: Action<any>[] = options.actions;
  return {
    id,
    auth: options.auth,
    client: options.client,
    display: {
      name: options.display.name,
      iconURI: options.display.icon,
    },
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
