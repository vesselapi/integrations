import { ZodError } from 'zod';

export type ActionErrorMeta = {
  type: 'action';
  cause?: unknown;
};

export type ValidationErrorMeta = {
  type: 'validation';
  cause?: ZodError;
};

export type HttpErrorMeta = {
  type: 'http';
  status: number;
  url: string;
  body: string | object | object[];
  cause?: unknown;
  headers: Record<string, string | string[]>;
};

export type ClientErrorMeta = {
  type: 'client';
  cause?: unknown;
};

export class IntegrationError extends Error {
  meta: ActionErrorMeta | HttpErrorMeta | ClientErrorMeta | ValidationErrorMeta;

  constructor(
    message: string,
    meta:
      | ActionErrorMeta
      | HttpErrorMeta
      | ClientErrorMeta
      | ValidationErrorMeta,
  ) {
    super(message);
    this.name = 'IntegrationError';
    this.meta = meta;
    this.cause = meta.cause;
  }
}
