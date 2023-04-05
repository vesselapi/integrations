import { BASE_URL } from '@/platforms/microsoft/constants';
import { z } from 'zod';

export const microsoftUrl = () =>
  z
    .string()
    .refine(
      (cursor) => cursor.startsWith(BASE_URL + '/'),
      'Microsoft Graph API cursors must use the Microsoft Graph API domain',
    )
    .transform((cursor) => cursor as `${typeof BASE_URL}/${string}`);
