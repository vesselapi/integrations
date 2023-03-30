import { z } from 'zod';
import { Action, ActionFunction } from './types';

export type ActionOptions<TZodSchema extends z.ZodType<any, any, any>> = {
  schema: TZodSchema;
  operation: string;
  resource: string;
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
    operation: options.operation,
    resource: options.resource,
    mutation: options.mutation,
    func,
  };
};
