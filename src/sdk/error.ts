type ActionErrorMeta = {
  type: 'action';
};

type HttpErrorMeta = {
  type: 'http';
  status: number;
  bodyText: string;
};

export class IntegrationError extends Error {
  meta: ActionErrorMeta | HttpErrorMeta;

  constructor(message: string, meta: ActionErrorMeta | HttpErrorMeta) {
    super(message);
    this.name = 'IntegrationError';
    this.meta = meta;
  }
}
