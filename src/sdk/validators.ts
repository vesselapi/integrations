import { NumberFormat, parsePhoneNumber } from 'libphonenumber-js';
import {
  baseObjectInputType,
  baseObjectOutputType,
  objectUtil,
  z,
  ZodObject,
  ZodRawShape,
  ZodTypeAny,
} from 'zod';

export const date = () =>
  z
    .string()
    .datetime()
    .transform((value) => new Date(value));

export const timestamp = (isSeconds = false) =>
  z.number().transform((value) => new Date(value * (isSeconds ? 1000 : 1)));

export const json = () => object({}).catchall(z.any()).optional();

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

export type ObjR<T extends ZodRawShape> = ZodObject<
  T,
  'strip',
  ZodTypeAny,
  {
    [k_1 in keyof objectUtil.addQuestionMarks<
      baseObjectOutputType<T>,
      {
        [k in keyof baseObjectOutputType<T>]: undefined extends baseObjectOutputType<T>[k]
          ? never
          : k;
      }[keyof T]
    >]: objectUtil.addQuestionMarks<
      baseObjectOutputType<T>,
      {
        [k in keyof baseObjectOutputType<T>]: undefined extends baseObjectOutputType<T>[k]
          ? never
          : k;
      }[keyof T]
    >[k_1];
  },
  { [k_2 in keyof baseObjectInputType<T>]: baseObjectInputType<T>[k_2] }
>;

// Create a shorthand for zod object passthrough and
// force the type down to reduce build output
export const object = <TShape extends ZodRawShape>(
  shape: TShape,
  params?: Parameters<typeof z.object>[1],
) => {
  return z.object(shape, params) as ObjR<TShape>;
};

// Create a shorthand for zod object passthrough since
// we need to use it everywhere.
export const passthrough = <TShape extends ZodRawShape>(
  shape: TShape,
  params?: Parameters<typeof z.object>[1],
) => {
  return z.object(shape, params).passthrough() as unknown as ObjR<TShape>;
};
