import { isFunction } from 'radash';
import { Action, ActionFunction } from './types';

export type ActionOptions = {};

export function action<TInput extends {}>(
  name: string,
  func: ActionFunction<TInput>,
): Action<TInput>;
export function action<TInput extends {}>(
  name: string,
  options: ActionOptions,
  func: ActionFunction<TInput>,
): Action<TInput>;
export function action<TInput extends {}>(
  name: string,
  optionsOrFunc: ActionOptions | ActionFunction<TInput>,
  func?: ActionFunction<TInput>,
): Action<TInput> {
  return {
    name,
    func: (isFunction(optionsOrFunc)
      ? optionsOrFunc
      : func!) as ActionFunction<TInput>,
  };
}
