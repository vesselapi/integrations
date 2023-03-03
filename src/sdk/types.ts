export type Fetch = typeof fetch;

export type Auth = {
  getAccessToken: () => Promise<string>;
  getConnectionSecrets: () => Promise<{}>;
};

export type AuthConfig = {};

export type Json =
  | string
  | number
  | boolean
  | { [Key in string]?: Json }
  | Json[]
  | null;

export type HTTPOptions = {
  path: string;
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'OPTIONS' | 'HEAD' | 'DELETE';
  headers: Record<string, string>;
  query: Record<string, string>;
  params: Record<string, string>;
  body: string | Json;
};

export interface PlatformClient {
  request: (options: HTTPOptions, auth: Auth) => Promise<any>;
}

export type PlatformDisplayConfig = {
  name: string
  iconURI: string
}

export type Platform = {
  id: string;
  auth: AuthConfig;
  client: PlatformClient;
  actions: {
    register: (actions: Action<any> | Action<any>[]) => void;
    find: (info: { name: string }) => Action<any> | null;
  };
  fetch: Fetch;
  display: PlatformDisplayConfig
};

export type ActionFunction<TInput extends {}> = (props: {
  input: TInput;
  auth: Auth;
  fetch: Fetch;
}) => Promise<any>;

export type Action<TInput extends {}> = {
  name: string;
  func: ActionFunction<TInput>;
};
