export type ActionErrorMeta = {
  type: 'action';
  cause?: unknown;
};

export type HttpErrorMeta = {
  type: 'http';
  status: number;
  body: string | object | object[];
  cause?: unknown;
};

export class IntegrationError extends Error {
  meta: ActionErrorMeta | HttpErrorMeta;

  constructor(message: string, meta: ActionErrorMeta | HttpErrorMeta) {
    super(message);
    this.name = 'IntegrationError';
    this.meta = meta;
    this.cause = meta.cause;
  }
}
