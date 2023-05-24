import { z } from 'zod';
import { Action, ActionFunction } from './types';

export type ActionOptions<
  TZodSchema extends z.ZodType<any, any, any>,
  TOperation,
  TResource,
> = {
  schema: TZodSchema;
  operation: TOperation;
  resource: TResource;
  scopes?: string[];
  mutation?: boolean;
};

export const action = <
  TName extends string,
  TOperation extends string,
  TResource extends string,
  TZodSchema extends z.ZodType<any, any, any>,
  TOutput extends {} | null | void,
>(
  name: TName,
  options: ActionOptions<TZodSchema, TOperation, TResource>,
  func: ActionFunction<z.infer<TZodSchema>, TOutput>,
): Action<TOperation, TResource, z.infer<TZodSchema>, TOutput> => {
  return {
    name,
    schema: options.schema,
    operation: options.operation,
    resource: options.resource,
    mutation: options.mutation,
    func,
  };
};
