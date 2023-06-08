import { Action, Unification, UnifiedAction } from '../sdk';

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
