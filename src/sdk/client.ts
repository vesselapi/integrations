import { IntegrationError } from '@/sdk/error';
import { Auth } from '@/sdk/types';
import { tryit } from 'radash';
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
    ): Promise<z.infer<TResponseSchema>> => {
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

      if (!response.ok) {
        const [err, body] = await tryit(response.json)();

        throw new IntegrationError('HTTP error in client', {
          type: 'http',
          body: !err ? body : await response.text(),
          status: response.status,
        });
      }

      const body = await response.json();

      const zodResult = await schema.safeParseAsync(body);
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
};
