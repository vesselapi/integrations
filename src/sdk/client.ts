import { Auth, ClientResult } from '@/sdk/types';
import { z } from 'zod';

export const makeRequestFactory = <TBaseUrl extends string>(
  baseUrl: TBaseUrl,
  makeFetch: ({
    url,
    method,
    headers,
    json,
    query,
  }: {
    auth: Auth;
    url: `${TBaseUrl}/${string}` | `/${string}`;
    fullUrl: `${TBaseUrl}/${string}` | `${TBaseUrl}/${string}?${string}`;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    headers: Record<string, string>;
    json?: Record<string, unknown>;
    query: Record<string, string>;
  }) => () => Promise<Response>,
) => {
  return <
      TPath,
      THeaders,
      TBody,
      TQuery,
      TMethod,
      TResponseSchema extends z.ZodType,
    >({
      url,
      method,
      schema,
      headers,
      json,
      query,
    }: {
      url: (args: TPath) => `${TBaseUrl}/${string}` | `/${string}`;
      method:
        | 'get'
        | 'post'
        | 'put'
        | 'delete'
        | 'patch'
        | ((args: TMethod) => 'get' | 'post' | 'put' | 'delete' | 'patch');
      headers?: (args: THeaders) => Record<string, string>;
      json?: (args: TBody) => Record<string, unknown>;
      query?: (args: TQuery) => Record<string, string>;
      schema: TResponseSchema;
    }) =>
    async (
      auth: Auth,
      args: TPath & THeaders & TBody & TQuery & TMethod,
    ): Promise<ClientResult<z.infer<TResponseSchema>>> => {
      const queryString = query
        ? new URLSearchParams(query(args)).toString()
        : '';

      const givenUrl = url(args);

      const fullUrl = `${
        givenUrl.startsWith(baseUrl) ? givenUrl : baseUrl + givenUrl
      }${queryString ? '?' + queryString : ''}` as `${TBaseUrl}/${string}`;

      const response = await auth.retry(
        makeFetch({
          auth,
          fullUrl,
          url: url(args),
          method: typeof method === 'string' ? method : method(args),
          headers: headers?.(args) ?? {},
          json: json?.(args) ?? {},
          query: query?.(args) ?? {},
        }),
      );

      const body = await response.json();

      if (!response.ok) {
        return {
          data: null,
          error: {
            type: 'http',
            body,
            status: response.status,
          },
        };
      }

      const zodResult = await schema.safeParseAsync(body);
      if (!zodResult.success) {
        return {
          data: null,
          error: {
            type: 'validation',
            zodError: zodResult.error,
            original: body,
          },
        };
      }

      return {
        error: null,
        data: await schema.parseAsync(body),
      };
    };
};
