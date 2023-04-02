import { NumberFormat, parsePhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

export const date = () =>
  z
    .string()
    .datetime({ offset: true })
    .transform((value) => new Date(value));

export const timestamp = (isSeconds = false) =>
  z.number().transform((value) => new Date(value * (isSeconds ? 1000 : 1)));

export const json = () => z.object({}).catchall(z.any()).optional();

export const formattedPhoneNumber = (format?: NumberFormat) =>
  z
    .string()
    .refine((value?) => {
      if (!value) return false;
      return parsePhoneNumber(value)?.isValid();
    })
    .transform((value) => {
      return parsePhoneNumber(value)?.format(format ?? 'E.164');
    });

// Create a shorthand for zod object passthrough since we need to use it everywhere.
export const object = ((shape: any, params: any) =>
  z.object(shape, params).passthrough()) as unknown as typeof z.object;

export const objectCreate = (schema: z.AnyZodObject, idKey: string = 'id') =>
  schema.partial().omit({ [idKey]: true });
