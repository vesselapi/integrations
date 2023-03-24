import { z } from 'zod';

export const date = () =>
  z.preprocess((value) => new Date(value as string), z.date());

export const json = () => z.object({}).catchall(z.any()).optional();
