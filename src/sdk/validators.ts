import { z } from 'zod';

export const date = () =>
  z
    .string()
    .datetime()
    .transform((value) => new Date(value));

export const json = () => z.object({}).catchall(z.any()).optional();
