import { isArray, merge } from 'radash';
import { Action, AuthConfig, Platform, PlatformClient } from './types';

export type PlatformOptions = {
  auth: AuthConfig;
  client: PlatformClient;
  actions: Action<any>[];
};

export const platform = (name: string, options: PlatformOptions): Platform => {
  let actions: Action<any>[] = options.actions;
  return {
    name,
    auth: options.auth,
    client: options.client,
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
