import { IntegrationError } from '@/sdk/error';
import { Auth, ClientResult, HttpsUrl } from '@/sdk/types';
import axios, { AxiosError } from 'axios';
import {
  assign,
  guard,
  isArray,
  isFunction,
  isObject,
  omit,
  trim,
  tryit,
} from 'radash';
import { z } from 'zod';
import * as qs from './query-string';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type HttpOptions<TQueryString extends qs.Any = qs.Any> = {
  url: `${HttpsUrl}/${string}` | `/${string}`;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  json?: Record<string, unknown> | Record<string, unknown>[];
  query?: TQueryString;
};

export const formatUpsertInputWithNative = <
  T extends { $native?: Record<string, unknown> } & Record<string, unknown>,
>(
  input: T,
): Omit<T, '$native'> => {
  if (!input.$native) return input;

  // Take keys from $native that overlap with the input and assign them to the input, recursively
  const assigned = assign(omit(input, ['$native']), input.$native ?? {});

  // Spread $native first so that the assigned (merged) values take precedence
  return {
    ...input.$native,
    ...assigned,
  } as Omit<T, '$native'>;
};

export type FetchOptions<TQueryString extends qs.Any = qs.Any> =
  HttpOptions<TQueryString> & {
    schema: z.ZodType;
    url: `${HttpsUrl}/${string}`;
  };

export type RequestFetchOptions<
  TResponseSchema extends z.ZodType,
  TQueryString extends qs.Any = qs.Any,
> = HttpOptions<TQueryString> & {
  url: `${HttpsUrl}/${string}` | `/${string}`;
  schema: TResponseSchema;
  validateResponse?: boolean;
};

export const formatUrl = (
  baseUrl: `${HttpsUrl}`,
  url: `${HttpsUrl}/${string}` | `/${string}`,
): `${HttpsUrl}/${string}` => {
  return !url.startsWith(baseUrl)
    ? `${baseUrl}${url}`
    : (url as `${HttpsUrl}/${string}`);
};

const customErrorMap: z.ZodErrorMap = (_, ctx) => {
  return {
    message: `${ctx.defaultError}. Received value: ${ctx.data}`,
  };
};

export const toBase64 = (str: string) => Buffer.from(str).toString('base64');

const _requestWithAxios = async ({
  url,
  options,
}: {
  url: string;
  options: FetchOptions & {
    headers: Record<string, string>;
  };
}) => {
  const [err, axiosResp] = await tryit(() =>
    axios.request({
      url: options.url,
      data: options.json,
      method: options.method,
      headers: options.headers,
    }),
  )();

  const getResponse = () => {
    if (axiosResp) {
      return axiosResp;
    } else if (err && err instanceof AxiosError && err.response) {
      return err.response;
    }
    throw err;
  };
  const response = getResponse();
  return {
    ok: response.status <= 399,
    text: () =>
      isObject(response.data) ? JSON.stringify(response.data) : response.data,
    json: () => (isObject(response.data) ? response.data : null),
    status: response.status,
    headers: response.headers as Record<string, string>,
    response,
    url,
    raw: response,
    options,
  };
};

const _requestWithFetch = async ({
  url,
  options,
}: {
  url: string;
  options: FetchOptions & {
    headers: Record<string, string>;
  };
}) => {
  const response = await fetch(url, {
    body: options.json ? JSON.stringify(options.json) : undefined,
    method: options.method,
    headers: options.headers,
  });
  const responseHeaders: Record<string, string> = {};
  response.headers.forEach((k, v) => (responseHeaders[k] = v));
  const text = await response.text();
  return {
    ok: response.status <= 399,
    text: () => text,
    json: () =>
      guard(
        () => JSON.parse(text) ?? null,
        (err) => err instanceof SyntaxError,
      ),
    status: response.status,
    headers: responseHeaders,
    response,
    url,
    raw: response,
    options,
  };
};

export const makeRequestFactory = (
  formatFetchOptions: (
    auth: Auth,
    options: Omit<RequestFetchOptions<z.ZodType>, 'query'> & {
      query: qs.List;
    },
  ) => Promise<
    Omit<FetchOptions, 'query'> & {
      query: qs.List;
    }
  >,
) => {
  function createRequest<
    TArgs extends {},
    TResponseSchema extends z.ZodType<unknown>,
  >(
    formatRequestOptions:
      | RequestFetchOptions<TResponseSchema, qs.List | qs.Map>
      | ((
          args: TArgs,
          auth: Auth,
        ) =>
          | Promise<RequestFetchOptions<TResponseSchema, qs.List | qs.Map>>
          | RequestFetchOptions<TResponseSchema, qs.List | qs.Map>),
  ) {
    const fetchRawResponse = async (auth: Auth, args: TArgs) =>
      await auth.retry(async () => {
        const reqOptions = isFunction(formatRequestOptions)
          ? await formatRequestOptions(args, auth)
          : formatRequestOptions;
        const options = await formatFetchOptions(auth, {
          ...reqOptions,
          query: reqOptions.query
            ? isArray(reqOptions.query)
              ? reqOptions.query
              : qs.toArray(reqOptions.query)
            : [],
        });
        const url =
          options.query.length > 0
            ? `${trim(options.url, '/')}?${qs.toString(options.query)}`
            : options.url;

        const headers = options.json
          ? {
              ...options.headers,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
          : {
              ...options.headers,
              Accept: 'application/json',
            };

        return (
          options.method === 'GET' && options.json
            ? _requestWithAxios
            : _requestWithFetch
        )({
          options: {
            ...options,
            headers,
          },
          url,
        });
      });
    const makeValidatedRequest = async (
      auth: Auth,
      args: TArgs,
      options: { strict?: boolean } = {},
    ): Promise<ClientResult<z.infer<TResponseSchema>>> => {
      const response = await fetchRawResponse(auth, args);
      const body = response.json() ?? { body: response.text() };

      if (!response.ok) {
        throw new IntegrationError('HTTP error from the downstream platform', {
          type: 'http',
          body,
          url: response.url,
          status: response.status,
          headers: response.headers,
          cause: response.raw,
        });
      }

      const zodResult = await response.options.schema.safeParseAsync(body, {
        errorMap: customErrorMap,
      });
      if (!zodResult.success) {
        if (options.strict) {
          throw new IntegrationError('Validation failed on client response', {
            type: 'validation',
            cause: zodResult.error,
          });
        }
        // For now, we log an error when validation fails on responses.
        // In the future, we may stop doing this once our schemas are robust
        // enough.
        //
        // We may also support an injectable logger object.
        console.error('Validation failed on client response', {
          zodError: zodResult.error,
          received: body,
        });

        return {
          // TODO: Deprecate "data" field
          data: body as z.infer<TResponseSchema>,
          $native: {
            headers: response.headers,
            body,
            url: response.url,
          },
        };
      }

      return {
        // TODO: Deprecate "data" field
        data: zodResult.data,
        $native: {
          headers: response.headers,
          body,
          url: response.url,
        },
      };
    };

    makeValidatedRequest.fetchRawResponse = () => fetchRawResponse;
    return makeValidatedRequest;
  }

  createRequest.passthrough = () =>
    createRequest((args: HttpOptions) => ({
      ...args,
      schema: z.any(),
    }));

  createRequest.fetch = () =>
    createRequest((args: HttpOptions) => ({
      ...args,
      schema: z.any(),
    })).fetchRawResponse();

  return createRequest;
};
