import { IntegrationError } from '@/sdk/error';
import { Auth, HttpsUrl } from '@/sdk/types';
import { guard, isFunction, trim } from 'radash';
import { z } from 'zod';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
export type HttpOptions = {
  url: `${HttpsUrl}/${string}` | `/${string}`;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  headers?: Record<string, string>;
  json?: Record<string, unknown>;
  query?: Record<string, string>;
};

export type FetchOptions = HttpOptions & {
  schema: z.ZodType;
};

export type RequestFetchOptions<TResponseSchema extends z.ZodType> =
  HttpOptions & {
    url: `${HttpsUrl}/${string}` | `/${string}`;
    schema: TResponseSchema;
  };

export const makeRequestFactory = (
  formatFetchOptions: (
    auth: Auth,
    options: RequestFetchOptions<z.ZodType>,
  ) => Promise<FetchOptions>,
) => {
  function createRequest<TArgs extends {}, TResponseSchema extends z.ZodType>(
    formatRequestOptions:
      | RequestFetchOptions<TResponseSchema>
      | ((args: TArgs) => RequestFetchOptions<TResponseSchema>),
  ) {
    return async function makeRequest(
      auth: Auth,
      args: TArgs,
    ): Promise<z.infer<TResponseSchema>> {
      const options = await formatFetchOptions(
        auth,
        isFunction(formatRequestOptions)
          ? formatRequestOptions(args)
          : formatRequestOptions,
      );
      const response = await auth.retry(async () => {
        const url = options.query
          ? `${trim(options.url, '/')}?${toQueryString(options.query)}`
          : options.url;
        return await fetch(url, {
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
      });

      if (!response.ok) {
        const text = await response.text();

        throw new IntegrationError('HTTP error in client', {
          type: 'http',
          body:
            guard(
              () => JSON.parse(text),
              (err) => err instanceof SyntaxError,
            ) ?? text,
          status: response.status,
          headers: response.headers,
          cause: response,
        });
      }

      const text = await response.text();
      const body = guard(
        () => JSON.parse(text),
        (err) => err instanceof SyntaxError,
      ) ?? { body: text };

      const zodResult = await options.schema.safeParseAsync(body);
      if (!zodResult.success) {
        // For now, we log an error when validation fails on responses.
        // In the future, we may stop doing this once our schemas are robust
        // enough.
        //
        // We may also support an injectable logger object.
        console.error('Validation failed on client response', {
          zodError: zodResult.error,
        });
        return body as z.infer<TResponseSchema>;
      }

      return zodResult.data;
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
