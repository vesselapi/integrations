import { z } from 'zod';

export const date = () =>
  z
    .string()
    .datetime()
    .transform((value) => new Date(value));

export const timestamp = (isSeconds = false) =>
  z.number().transform((value) => new Date(value * (isSeconds ? 1000 : 1)));

export const json = () => z.object({}).catchall(z.any()).optional();

// Create a shorthand for zod object passthrough since we need to use it everywhere.
export const object = ((shape: any, params: any) =>
  z.object(shape, params).passthrough()) as unknown as typeof z.object;
