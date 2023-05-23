export type ActionErrorMeta = {
  type: 'action';
  cause?: unknown;
};

export type HttpErrorMeta = {
  type: 'http';
  status: number;
  body: string | object | object[];
  cause?: unknown;
  headers: Headers;
};

export type ClientErrorMeta = {
  type: 'client';
  cause?: unknown;
};

export class IntegrationError extends Error {
  meta: ActionErrorMeta | HttpErrorMeta | ClientErrorMeta;
  alert: boolean;

  constructor(
    message: string,
    meta: ActionErrorMeta | HttpErrorMeta | ClientErrorMeta,
  ) {
    super(message);
    this.name = 'IntegrationError';
    this.meta = meta;
    this.cause = meta.cause;
    this.alert = true;
  }
}
