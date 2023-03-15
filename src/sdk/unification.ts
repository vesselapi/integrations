import { Action } from '../sdk';

export type UnifiedAction<
  TName extends string,
  TVertical extends string,
  TInput extends {},
  TOutput extends {} | null,
> = Action<TName, TInput, TOutput> & {
  integrationId: string;
  vertical: TVertical;
};

export type Unification<TVertical extends string> = {
  vertical: TVertical;
  actions: UnifiedAction<string, TVertical, any, any>[];
};

export const unification = <
  TPlatforms extends string,
  TUnifiedAction extends Action<string, any, any>,
  TVertical extends string = string,
>(
  vertical: TVertical,
  actions: {
    [P in TPlatforms]: Record<string, TUnifiedAction>;
  },
): Unification<TVertical> => {
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
    }, [] as UnifiedAction<string, TVertical, any, any>[]),
  };
};
