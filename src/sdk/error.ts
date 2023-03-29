export type ActionErrorMeta = {
  type: 'action';
};

export type HttpErrorMeta = {
  type: 'http';
  status: number;
  body: string | object | object[];
};

export class IntegrationError extends Error {
  meta: ActionErrorMeta | HttpErrorMeta;

  constructor(message: string, meta: ActionErrorMeta | HttpErrorMeta) {
    super(message);
    this.name = 'IntegrationError';
    this.meta = meta;
  }
}
