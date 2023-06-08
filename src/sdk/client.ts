import { IntegrationError } from '@/sdk/error';
import { Auth, ClientResult, HttpsUrl } from '@/sdk/types';
import { guard, isFunction, omit, trim } from 'radash';
import { z } from 'zod';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type HttpOptions = {
  url: `${HttpsUrl}/${string}` | `/${string}`;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  json?: Record<string, unknown> | Record<string, unknown>[];
  query?: Record<string, string>;
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
  };

export const formatUrl = (
  baseUrl: `${HttpsUrl}`,
  url: `${HttpsUrl}/${string}` | `/${string}`,
): `${HttpsUrl}/${string}` => {
  return !url.startsWith(baseUrl)
    ? `${baseUrl}${url}`
    : (url as `${HttpsUrl}/${string}`);
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
    return async function makeRequest(
      auth: Auth,
      args: TArgs,
    ): Promise<ClientResult<z.infer<TResponseSchema>>> {
      const { response, options } = await auth.retry(async () => {
        const options = await formatFetchOptions(
          auth,
          isFunction(formatRequestOptions)
            ? formatRequestOptions(args)
            : formatRequestOptions,
        );
        const url = options.query
          ? `${trim(options.url, '/')}?${toQueryString(options.query)}`
          : options.url;
        const response = await fetch(url, {
          body: options.json ? JSON.stringify(options.json) : undefined,
          method: options.method,
          headers: options.json
            ? {
                ...options.headers,
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
            : {
                ...options.headers,
                Accept: 'application/json',
              },
        });
        return { response, options };
      });

      const text = await response.text();
      const body = guard(
        () => JSON.parse(text),
        (err) => err instanceof SyntaxError,
      ) ?? { body: text };

      if (!response.ok) {
        throw new IntegrationError('HTTP error in client', {
          type: 'http',
          body,
          status: response.status,
          headers: response.headers,
          cause: response,
        });
      }

      const zodResult = await options.schema.safeParseAsync(body);
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
          data: body as z.infer<TResponseSchema>,
          $native: {
            headers: [...response.headers].reduce(
              (obj, [key, value]) => ({ ...obj, [key]: value }),
              {},
            ),
            body: body,
          },
        };
      }

      return {
        data: zodResult.data,
        $native: {
          headers: [...response.headers].reduce(
            (obj, [key, value]) => ({ ...obj, [key]: value }),
            {},
          ),
          body: body,
        },
      };
    };
  }

  createRequest.passthrough = () =>
    createRequest((args: HttpOptions) => ({
      ...args,
      schema: z.any(),
    }));

  return createRequest;
};

const toQueryString = (query: Record<string, string>): string => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    params.set(key, value);
  }
  return params.toString();
};
