import { Action } from '../sdk';

export type UnifiedAction<
  TName extends string,
  TInput extends {},
  TOutput extends {} | null,
> = Action<TName, TInput, TOutput> & {
  integrationId: string;
  vertical: string;
};

export type Unification = {
  vertical: string;
  actions: UnifiedAction<string, any, any>[];
};

export const unification = <
  TPlatforms extends string,
  TUnifiedActions extends Action<string, any, any>,
>(
  vertical: string,
  actions: {
    [P in TPlatforms]: Record<string, TUnifiedActions>;
  },
): Unification => {
  const keys = Object.keys(actions) as (keyof typeof actions)[];
  return {
    vertical,
    actions: keys.reduce((acc, integrationId) => {
      return [
        ...acc,
        ...Object.values(actions[integrationId]).map((a) => ({
          ...a,
          integrationId,
          vertical,
        })),
      ];
    }, [] as UnifiedAction<string, any, any>[]),
  };
};
