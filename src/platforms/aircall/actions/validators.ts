import { z } from 'zod';
import { BASE_URL } from '../constants';

export const aircallUrl = () =>
  z
    .string()
    .refine(
      (url) => url.startsWith(BASE_URL + '/'),
      'Aircall urls must use the Aircall domain',
    )
    .transform((url) => url as `${typeof BASE_URL}/${string}`);
