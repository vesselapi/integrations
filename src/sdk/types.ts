export type Auth = {
  getAccessToken: () => Promise<string>;
};

export type AuthConfig = {};

export type Platform = {
  name: string;
  auth: AuthConfig;
};

export type ActionFunction<TInput extends {}> = (
  input: TInput,
  auth: Auth,
) => Promise<any>;

export type Action<TInput extends {}> = {
  name: string;
  func: ActionFunction<TInput>;
};
