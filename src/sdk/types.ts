import { ZodType } from 'zod';

export type Fetch = typeof fetch;

export type Auth = {
  getAccessToken: () => Promise<string>;
  getConnectionSecrets: () => Promise<{}>;
};

export type RequestFunction = (options: HTTPOptions) => Promise<any>;

export type HttpsUrl = `https://${string}`;
export type AuthQuestionType = 'string' | 'select';
export type AuthQuestion = {
  type: AuthQuestionType;
  id: string;
  label: string;
};

export type StandardAuthConfig = {
  type: 'standard';
  default: boolean;
  /**
   * Used by the FE to render form fields.
   * E.g. Asking for Api token
   */
  questions: AuthQuestion[];
};

/**
 * OAUTH2: Many of the options defined here follow the simple auth package
 * https://github.com/lelylan/simple-oauth2/blob/fbb295b1ae0ea998bcdf4ad22a6ef2fcf6930d12/API.md#new-authorizationcodeoptions
 */
export type OAuth2AuthConfig = {
  type: 'oauth2';
  default: boolean;
  authUrl: HttpsUrl;
  tokenUrl: HttpsUrl;
  /**
   * Depending on the end platform wrote their OAuth, the clientId and
   * clientSecret could be requested in the Auth header using Basic Auth
   * or provided in the body params.
   */
  tokenAuth: 'header' | 'body'; //  defaults to 'body';
  /**
   * Defaults to ' '. The scope separator may differ between platforms.
   * Used by the FE to render form fields before OAuth login
   */
  scopeSeparator: ',' | ' ';
  questions: AuthQuestion[];
  url: (arg: {
    answers: Record<string, string>;
    scopes: string[];
    clientId: string;
    redirectUrl: string;
    state: Record<string, string>;
  }) => HttpsUrl;
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

export type Platform<
  TActions extends Record<string, Action<string, any, any>>,
> = {
  id: string;
  auth: (StandardAuthConfig | OAuth2AuthConfig)[];
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
  schema: ZodType<TInput>;
  resource?: string;
  scopes?: string[];
  mutation?: boolean;
  func: ActionFunction<TInput, TOutput>;
};

export type DirectlyInvokedAction<
  TInput extends {},
  TOutput extends {} | null,
> = (input: TInput, auth?: Auth) => Promise<TOutput>;

export type UnifiedAction<
  TName extends string,
  TVertical extends string,
  TInput extends {},
  TOutput extends {} | null,
> = Action<TName, TInput, TOutput> & {
  integrationId: string;
  vertical: TVertical;
};

export type Unification<TVertical extends string = string> = {
  vertical: TVertical;
  actions: UnifiedAction<string, TVertical, any, any>[];
};
