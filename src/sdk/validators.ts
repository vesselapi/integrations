import { NumberFormat, parsePhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

export const date = () =>
  z
    .union([
      z.number(),
      z.string().datetime({ offset: true }),
      z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
    ])
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

// TODO: remove this since we no longer use passthrough
export const object = z.object;

type WithNative<T> = T & { $native?: Record<string, any> };
export function addNativeToZodSchema<T extends Record<string, unknown>>(
  schema: z.ZodType<T, any, any>,
): z.ZodType<WithNative<T>, any, any> {
  return z.preprocess((data) => {
    return {
      ...(data as T),
      $native: data,
    };
  }, z.intersection(schema, z.object({ $native: z.record(z.any()).optional() })));
}

// Create a shorthand for zod object passthrough since we need to use it everywhere.
// export const object = ((shape: any, params: any) =>
//   z.object(shape, params).passthrough()) as unknown as typeof z.object;
