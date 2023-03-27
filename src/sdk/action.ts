import { z } from 'zod';
import { Action, ActionFunction, ClientResult } from './types';

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ActionError';
  }
}

export class ActionClientError extends ActionError {
  reason: ClientResult<any>['error'];
  constructor(message: string, reason: ClientResult<any>['error']) {
    super(message);
    this.reason = reason;
    this.name = 'ActionClientError';
  }

  static fromClientResult<TResponse extends object>(
    error: Exclude<ClientResult<TResponse>['error'], null>,
  ) {
    if (error.type === 'validation') {
      throw new ActionClientError('Validation failed on response', error);
    } else {
      throw new ActionClientError('HTTP error in platform', error);
    }
  }
}

export type ActionOptions<TZodSchema extends z.ZodType<any, any, any>> = {
  schema: TZodSchema;
  resource?: string;
  scopes?: string[];
  mutation?: boolean;
};

export const action = <
  TName extends string,
  TZodSchema extends z.ZodType<any, any, any>,
  TOutput extends {} | null | void,
>(
  name: TName,
  options: ActionOptions<TZodSchema>,
  func: ActionFunction<z.infer<TZodSchema>, TOutput>,
): Action<TName, z.infer<TZodSchema>, TOutput> => {
  return {
    name,
    schema: options.schema,
    resource: options.resource,
    mutation: options.mutation,
    func,
  };
};
