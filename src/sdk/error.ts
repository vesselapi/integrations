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
  /**
   * If set to true this error will be treated
   * as an issue that needs attention, causing
   * an alert.
   */
  alert?: boolean;
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
