import { CamelCasedPropertiesDeep, SetOptional } from 'type-fest';
import { z } from 'zod';
import { HttpOptions } from './client';

export type Fetch = typeof fetch;

export type OAuth2Metadata = {
  type: 'oauth2';
  answers: Record<string, string>;
  accessToken: string;
  refreshToken: string | null;
  oauthResponse: Record<string, unknown>;
};

export type ApiKeyMetadata = {
  type: 'apiKey';
  answers: Record<string, string>;
};

export type BasicMetadata = {
  type: 'basic';
  answers: Record<string, string>;
};

export type AuthMetadata = OAuth2Metadata | ApiKeyMetadata | BasicMetadata;
export type AuthType = AuthMetadata['type'];

type BaseFetchResult = {
  status: number;
  text: () => string;
  json: () => Json;
  response: Response | unknown;
};

type BaseAuth<T extends AuthMetadata> = {
  type: T['type'];
  getMetadata: () => Promise<T>;
  getToken: () => Promise<string>;
  retry: <TResult extends BaseFetchResult>(
    func: () => Promise<TResult>,
  ) => Promise<TResult>;
};

export type OAuth2Auth = BaseAuth<OAuth2Metadata>;
export type ApiKeyAuth = BaseAuth<ApiKeyMetadata>;
export type BasicAuth = BaseAuth<BasicMetadata>;

export type Auth = OAuth2Auth | ApiKeyAuth | BasicAuth;

export type HttpsUrl = `https://${string}`;
export type AuthQuestionType = 'text' | 'select';
export type AuthQuestionOption = {
  value: string;
  label: string;
  default?: boolean;
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
  type: 'text';
};

export type AuthQuestion = SelectAuthQuestion | StringAuthQuestion;

export type RetryableCheckFunction = ({
  status,
  text,
}: BaseFetchResult) => Promise<boolean>;

// @deprecated
export type StandardAuthConfig<
  TAnswers extends Record<string, string> = Record<string, string>,
> = {
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
  toTokenString: (answers: TAnswers) => string;
};

type BaseConfig<T extends AuthMetadata> = {
  type: T['type'];
  default: boolean;
};

export type ApiKeyAuthConfig<
  TAnswers extends Record<string, string> = Record<string, string>,
> = BaseConfig<ApiKeyMetadata> & {
  /**
   * Used by the FE to render form fields.
   * E.g. Asking for Api token
   */
  questions: AuthQuestion[];
  display: {
    markdown: string | ((platform: Platform<{}, any, string>) => string);
  };
  toTokenString: (answers: TAnswers) => string;
};

export type BasicAuthConfig<
  TAnswers extends Record<string, string> = Record<string, string>,
> = BaseConfig<BasicMetadata> & {
  /**
   * Used by the FE to render form fields.
   * E.g. Asking for username/pass
   */
  questions: AuthQuestion[];
  display: {
    markdown: string | ((platform: Platform<{}, any, string>) => string);
  };
  toTokenString: (answers: TAnswers) => string;
};

/**
 * OAUTH2: Many of the options defined here follow the simple auth package
 * https://github.com/lelylan/simple-oauth2/blob/fbb295b1ae0ea998bcdf4ad22a6ef2fcf6930d12/API.md#new-authorizationcodeoptions
 */
export type OAuth2AuthConfig<
  TAnswers extends Record<string, string> = Record<string, string>,
  TOAuth2AppMeta extends Record<string, unknown> = Record<string, unknown>,
  TOAuth2CallbackArgs extends Record<string, unknown> = Record<string, unknown>,
> = BaseConfig<OAuth2Metadata> & {
  authUrl: (options: {
    answers: TAnswers;
    /** @deprecated */
    appMetadata: TOAuth2AppMeta;
  }) => HttpsUrl;
  tokenUrl: (options: {
    answers: TAnswers;
    /** @deprecated */
    appMetadata: TOAuth2AppMeta;
    callbackArgs: TOAuth2CallbackArgs;
  }) => HttpsUrl;
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
  /**
   * Additional Auth Params to pass when the `authUrl` is called.
   */
  authParams: Record<string, string | boolean>;
  url: (arg: {
    answers: TAnswers;
    scopes: string[];
    clientId: string;
    redirectUrl: string;
    state: string;
    appMetadata: TOAuth2AppMeta;
  }) => HttpsUrl;
  isRetryable: RetryableCheckFunction;
  display: {
    markdown: string | ((platform: Platform<{}, any, string>) => string);
  };
  /**
   * Scopes that will always be requested and are
   * required to make an API call.
   */
  requiredScopes: string[];
  /**
   * Surfaces information we store about the
   * OAuth2 app itself.
   *
   * This was used by msoft teams but is being deprecated in
   * favor of a different auth method.
   * @deprecated */
  appMetadataSchema: z.ZodType<TOAuth2AppMeta>;
  /**
   * Surfaces information that we got in the query string
   * of the callback url that was called by the downstream
   * system after the /authorization step.
   */
  callbackArgsSchema: z.ZodType<TOAuth2CallbackArgs>;
  refreshTokenExpiresAt: () => Date | null;
  accessTokenExpiresAt: () => Date | null;
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

export type Category =
  | 'dialer'
  | 'crm'
  | 'marketing-automation'
  | 'chat'
  | 'engagement'
  | 'ticketing'
  | 'commerce';

export type PlatformDisplayConfig = {
  name: string;
  /** @deprecated */
  iconURI?: string;
  logos: {
    /**
     * The logo that is used by default when neither the
     * full or box logo is explicitly needed. This can and often
     * is the same as either the full or the box logo.
     */
    defaultURI: string;
    /**
     * The full logo is the expanded version of the
     * logo that includes the name of the company
     */
    fullURI?: string;
    /**
     * The box logo is the condensed version of the
     * logo that only includes the icon itself
     */
    boxURI?: string;
  };
  colors?: {
    primary: string;
  };
  domain?: string;
  categories: Category[];
};

export type PlatformConstants = Record<string, any>;
export type Platform<
  TActions extends Record<string, Action<string, any, any>>,
  TClient extends PlatformClient,
  TId extends string,
  TBasicAnswers extends Record<string, string> = Record<string, string>,
  TApiKeyAnswers extends Record<string, string> = Record<string, string>,
  TOAuth2Answers extends Record<string, string> = Record<string, string>,
  TOAuth2AppMeta extends Record<string, unknown> = Record<string, unknown>,
  TConstants extends PlatformConstants = PlatformConstants,
> = {
  id: TId;
  auth: (
    | BasicAuthConfig<TBasicAnswers>
    | ApiKeyAuthConfig<TApiKeyAnswers>
    | OAuth2AuthConfig<TOAuth2Answers, TOAuth2AppMeta>
  )[];
  rawActions: Action<string, any, any>[];
  client: TClient;
  constants: TConstants;
  actions: TActions;
  display: PlatformDisplayConfig;
};

export type ActionFunction<
  TInput extends {},
  TOutput extends {} | null | void,
> = (props: { input: TInput; auth: Auth }) => Promise<ActionResult<TOutput>>;

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
> = (input: TInput, auth: Auth) => Promise<ActionResult<TOutput>>;

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

type RawResponse = {
  headers: Record<string, string>;
  body: Json;
  url: string;
};

export type ClientResult<TValidated> = {
  data: TValidated;
  $native: RawResponse;
};

export type ActionResult<TOutput> = CamelCasedPropertiesDeep<TOutput> & {
  $native?:
    | SetOptional<RawResponse, 'body'>
    | SetOptional<RawResponse, 'body'>[];
};
