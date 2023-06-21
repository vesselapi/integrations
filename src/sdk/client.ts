import { IntegrationError } from '@/sdk/error';
import { Auth, ClientResult, HttpsUrl } from '@/sdk/types';
import { guard, isFunction, omit, trim } from 'radash';
import * as undici from 'undici';
import { z } from 'zod';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type HttpOptions = {
  url: `${HttpsUrl}/${string}` | `/${string}`;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  json?: Record<string, unknown> | Record<string, unknown>[];
  query?: Record<string, string | number>;
};

export const formatUpsertInputWithNative = <
  T extends { $native?: Record<string, unknown> } & Record<string, unknown>,
>(
  input: T,
): Omit<T, '$native'> => {
  return {
    ...omit(input, ['$native']),
    ...(input.$native ?? {}),
  };
};

export type FetchOptions = HttpOptions & {
  schema: z.ZodType;
  url: `${HttpsUrl}/${string}`;
};

export type RequestFetchOptions<TResponseSchema extends z.ZodType> =
  HttpOptions & {
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

const _requestWithUndici = async ({
  url,
  options,
}: {
  url: string;
  options: FetchOptions & {
    headers: Record<string, string>;
  };
}) => {
  const response = await undici.request(options.url, {
    body: options.json ? JSON.stringify(options.json) : undefined,
    method: options.method,
    headers: options.headers,
  });
  const text = await response.body.text();
  return {
    ok: response.statusCode <= 399,
    text: () => text,
    json: () =>
      guard(
        () => JSON.parse(text),
        (err) => err instanceof SyntaxError,
      ),
    status: response.statusCode,
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
        () => JSON.parse(text),
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
    options: RequestFetchOptions<z.ZodType>,
  ) => Promise<FetchOptions>,
) => {
  function createRequest<
    TArgs extends {},
    TResponseSchema extends z.ZodType<unknown>,
  >(
    formatRequestOptions:
      | RequestFetchOptions<TResponseSchema>
      | ((args: TArgs) => RequestFetchOptions<TResponseSchema>),
  ) {
    const fetchRawResponse = async (auth: Auth, args: TArgs) =>
      await auth.retry(async () => {
        const options = await formatFetchOptions(
          auth,
          isFunction(formatRequestOptions)
            ? formatRequestOptions(args)
            : formatRequestOptions,
        );
        const url = options.query
          ? `${trim(options.url, '/')}?${toQueryString(options.query)}`
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
            ? _requestWithUndici
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
    ): Promise<ClientResult<z.infer<TResponseSchema>>> => {
      const response = await fetchRawResponse(auth, args);

      const body = response.json() ?? { body: response.text };

      if (!response.ok) {
        throw new IntegrationError('HTTP error in client', {
          type: 'http',
          body,
          url: response.url,
          status: response.status,
          headers: response.headers,
          cause: response.raw,
        });
      }

      const zodResult = await response.options.schema.safeParseAsync(body);
      if (!zodResult.success) {
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

const toQueryString = (query: Record<string, string | number>): string => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    params.set(key, `${value}`);
  }
  return params.toString();
};
