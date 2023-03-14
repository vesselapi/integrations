export type Fetch = typeof fetch;

export type Auth = {
  getAccessToken: () => Promise<string>;
  getConnectionSecrets: () => Promise<{}>;
};

export type AuthQuestionType = 'string' | 'select';
export type AuthQuestion = {
  type: AuthQuestionType;
  id: string;
  label: string;
};

export type StandardAuthConfig = {
  type: 'standard';
  questions?: AuthQuestion[]; // Used by the FE to render form fields. E.g. Asking for Api token
};

/**
 * OAUTH2: Many of the options defined here follow the simple auth package
 * https://github.com/lelylan/simple-oauth2/blob/fbb295b1ae0ea998bcdf4ad22a6ef2fcf6930d12/API.md#new-authorizationcodeoptions
 */
export type OAuth2AuthConfig = {
  type: 'oauth2';
  authUrl: `https://${string}`;
  tokenUrl: `https://${string}`;
  /**
   * Depending on the end platform wrote their OAuth, the clientId and
   * clientSecret could be requested in the Auth header using Basic Auth
   * or provided in the body params.
   */
  tokenAuth?: 'header' | 'body'; //  defaults to 'body';
  /**
   * Defaults to ' '. The scope separator may differ between platforms.
   * Used by the FE to render form fields before OAuth login
   */
  scopeSeparator?: ',' | ' ';
  questions?: AuthQuestion[]; //
  defaultScopes: string[];
  url: (arg: {
    answers: Record<string, string>;
    scopes: string[];
    clientId: string;
    redirectUrl: string;
    state: Record<string, string>;
  }) => `https://${string}`;
};

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
  name: string;
  iconURI: string;
};

export type Platform = {
  id: string;
  auth: (StandardAuthConfig | OAuth2AuthConfig)[];
  client: PlatformClient;
  actions: {
    register: (actions: Action<any> | Action<any>[]) => void;
    find: (info: { name: string }) => Action<any> | null;
  };
  fetch: Fetch;
  display: PlatformDisplayConfig;
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
