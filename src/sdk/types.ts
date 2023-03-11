import { ZodType } from 'zod';

export type Fetch = typeof fetch;

export type RequestFunction = (options: HTTPOptions) => Promise<any>;

export type HttpsUrl = `https://${string}`;

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
  apply: (
    options: HTTPOptions,
    auth: { answers: Record<string, string> },
  ) => HTTPOptions;
};

/**
 * OAUTH2: Many of the options defined here follow the simple auth package
 * https://github.com/lelylan/simple-oauth2/blob/fbb295b1ae0ea998bcdf4ad22a6ef2fcf6930d12/API.md#new-authorizationcodeoptions
 */
export type OAuth2AuthConfig = {
  type: 'oauth2';
  authUrl: HttpsUrl;
  tokenUrl: HttpsUrl;
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
  url: (arg: {
    answers: Record<string, string>;
    scopes: string[];
    clientId: string;
    redirectUrl: string;
    state: Record<string, string>;
  }) => HttpsUrl;
  apply: (
    options: HTTPOptions,
    auth: { accessToken: string; answers: Record<string, string> },
  ) => HTTPOptions;
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

type Unary<F extends Function> = F extends (args: infer A) => any ? A : never;

export type Platform<
  TActions extends Record<string, Action<string, any, any>>,
> = {
  id: string;
  support: {
    passthrough: boolean;
  };
  auth: StandardAuthConfig | OAuth2AuthConfig;
  rawActions: Action<string, any, any>[];
  actions: {
    [Key in keyof TActions]: TActions[Key] extends Action<
      string,
      infer TInput,
      infer TOutput
    >
      ? DirectlyInvokedAction<TInput, TOutput>
      : never;
  };
  request?: RequestFunction;
  display: PlatformDisplayConfig;
};

export type ActionFunction<
  TInput extends {},
  TOutput extends {} | null,
> = (props: { input: TInput; auth: Auth }) => Promise<TOutput>;

export type Action<
  TName extends string,
  TInput extends {},
  TOutput extends {} | null,
> = {
  name: TName;
  schema: ZodType<any, any, any>;
  resource?: string;
  scopes?: string[];
  mutation?: boolean;
  func: ActionFunction<TInput, TOutput>;
};

export type DirectlyInvokedAction<
  TInput extends {},
  TOutput extends {} | null,
> = (input: TInput) => Promise<TOutput>;

//
// REMOVE ME
//

const x = {} as any as Platform<{
  getLead: Action<string, { id: string }, { name: string }>;
}>;

x.actions.getLead({ id: '' });
