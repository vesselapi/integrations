import { isFunction } from 'radash';
import { infer as ZodInfer, ZodType } from 'zod';
import { Action, ActionFunction } from './types';

export type ActionOptions<TZodSchema extends ZodType<any, any, any>> = {
  schema: TZodSchema;
  resource?: string;
  scopes?: string[];
  mutation?: boolean;
};

export function action<TInput extends {}, TOutput extends {}>(
  name: string,
  func: ActionFunction<TInput, TOutput>,
): Action<TInput, TOutput>;

export function action<
  TZodSchema extends ZodType<any, any, any>,
  TOutput extends {},
>(
  name: string,
  options: ActionOptions<TZodSchema>,
  func: ActionFunction<ZodInfer<TZodSchema>, TOutput>,
): Action<ZodInfer<TZodSchema>, TOutput>;

export function action<
  TZodSchema extends ZodType<any, any, any>,
  TInput extends {},
  TOutput extends {},
>(
  name: string,
  optionsOrFunc: ActionOptions<TZodSchema> | ActionFunction<TInput, TOutput>,
  func?: ActionFunction<TInput, TOutput>,
): Action<TInput, TOutput> {
  return {
    name,
    func: (isFunction(optionsOrFunc) ? optionsOrFunc : func!) as ActionFunction<
      TInput,
      TOutput
    >,
  };
}
