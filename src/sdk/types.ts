import { z } from 'zod';
import { HttpOptions } from './client';

export type Fetch = typeof fetch;

export type OAuth2Metadata = {
  type: 'oauth2';
  answers: Record<string, string>;
  accessToken: string;
  refreshToken: string;
};

export type StandardMetadata = {
  type: 'standard';
  answers: Record<string, string>;
};

type BaseAuth = {
  getToken: () => Promise<string>;
  retry: (func: () => Promise<Response>) => Promise<Response>;
};

export type OAuth2Auth = BaseAuth & {
  type: 'oauth2';
  getMetadata: () => Promise<OAuth2Metadata>;
};

export type StandardAuth = BaseAuth & {
  type: 'standard';
  getMetadata: () => Promise<StandardMetadata>;
};

export type Auth = OAuth2Auth | StandardAuth;

export type HttpsUrl = `https://${string}`;
export type AuthQuestionType = 'string' | 'select';
export type AuthQuestionOption = {
  value: string;
  label: string;
};

export interface BaseAuthQuestion {
  id: string;
  label: string;
}

export type SelectAuthQuestion = BaseAuthQuestion & {
  type: 'select';
  options: AuthQuestionOption[];
};

export type StringAuthQuestion = BaseAuthQuestion & {
  type: 'string';
};

export type AuthQuestion = SelectAuthQuestion | StringAuthQuestion;

export type RetryableCheckFunction = ({
  response,
}: {
  response: Response;
}) => boolean;

export type StandardAuthConfig = {
  type: 'standard';
  default: boolean;
  /**
   * Used by the FE to render form fields.
   * E.g. Asking for Api token
   */
  questions: AuthQuestion[];
  display: {
    markdown: string | ((platform: Platform<{}, any, string>) => string);
  };
  toTokenString: (answers: Record<string, string>) => string;
};

/**
 * OAUTH2: Many of the options defined here follow the simple auth package
 * https://github.com/lelylan/simple-oauth2/blob/fbb295b1ae0ea998bcdf4ad22a6ef2fcf6930d12/API.md#new-authorizationcodeoptions
 */
export type OAuth2AuthConfig = {
  type: 'oauth2';
  default: boolean;
  authUrl: (options: { answers: Record<string, string> }) => HttpsUrl;
  tokenUrl: (options: { answers: Record<string, string> }) => HttpsUrl;
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
  scopeSeparator: ',' | ' ' | '+';
  questions: AuthQuestion[];
  oauthBodyFormat: 'json' | 'form';
  url: (arg: {
    answers: Record<string, string>;
    scopes: string[];
    clientId: string;
    redirectUrl: string;
    state: string;
  }) => HttpsUrl;
  isRetryable: RetryableCheckFunction;
  display: {
    markdown: string | ((platform: Platform<{}, any, string>) => string);
  };
};

export type Json =
  | string
  | number
  | boolean
  | { [Key in string]?: Json }
  | Json[]
  | null;

export interface PlatformClient {
  passthrough: (auth: Auth, options: HttpOptions) => Promise<any>;
}

export type PlatformDisplayConfig = {
  name: string;
  iconURI: string;
};

export type PlatformConstants = Record<string, any>;
export type Platform<
  TActions extends Record<string, Action<string, any, any>>,
  TClient extends PlatformClient,
  TId extends string,
> = {
  id: TId;
  auth: (StandardAuthConfig | OAuth2AuthConfig)[];
  rawActions: Action<string, any, any>[];
  client: TClient;
  verticals: UnificationVertical[];
  constants: PlatformConstants;
  actions: {
    [Key in keyof TActions]: TActions[Key] extends Action<
      string,
      infer TInput,
      infer TOutput
    >
      ? DirectlyInvokedAction<TInput, TOutput>
      : never;
  };
  display: PlatformDisplayConfig;
};

export type ActionFunction<
  TInput extends {},
  TOutput extends {} | null | void,
> = (props: { input: TInput; auth: Auth }) => Promise<TOutput>;

export type Action<
  TName extends string,
  TInput extends {},
  TOutput extends {} | null | void,
> = {
  name: TName;
  schema: z.ZodType<TInput>;
  operation: string;
  resource: string;
  scopes?: string[];
  mutation?: boolean;
  func: ActionFunction<TInput, TOutput>;
};

export type DirectlyInvokedAction<
  TInput extends {},
  TOutput extends {} | null | void,
> = (input: TInput, auth: Auth) => Promise<TOutput>;

export type UnificationVertical =
  | 'dialer'
  | 'crm'
  | 'marketing'
  | 'chat'
  | 'engagement';

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
