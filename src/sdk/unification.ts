import { Action, ActionValidation, Unification, UnifiedAction } from '../sdk';

export const unification = <
  TPlatforms extends string,
  TUnifiedAction extends Action<string, string, any, any>,
  TVertical extends string = string,
  TUnifiedActions extends TUnifiedAction[] = TUnifiedAction[],
>(
  vertical: TVertical,
  actions: {
    [P in TPlatforms]: ActionValidation<[...TUnifiedActions]>;
  },
): Unification<TVertical> => {
  const keys = Object.keys(actions) as (keyof typeof actions)[];
  return {
    vertical,
    actions: keys.reduce((acc, integrationId) => {
      return [
        ...acc,
        ...actions[integrationId].map((a) => ({
          ...a,
          integrationId,
          vertical,
        })),
      ];
    }, [] as UnifiedAction<string, string, TVertical, any, any>[]),
  };
};
