import { BASE_URL } from '@/platforms/aircall/client';
import { z } from 'zod';

export const aircallUrl = () =>
  z
    .string()
    .refine(
      (url) => url.startsWith(BASE_URL + '/'),
      'Aircall urls must use the Aircall domain',
    )
    .transform((url) => url as `${typeof BASE_URL}/${string}`);
