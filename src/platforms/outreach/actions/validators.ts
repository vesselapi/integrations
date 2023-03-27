import { BASE_URL } from '@/platforms/outreach/client';
import { z } from 'zod';

export const outreachUrl = () =>
  z
    .string()
    .refine(
      (cursor) => cursor.startsWith(BASE_URL + '/'),
      'Outreach cursors must use the Outreach domain',
    )
    .transform((cursor) => cursor as `${typeof BASE_URL}/${string}`);
