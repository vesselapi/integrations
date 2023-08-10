export const API_VERSION = 'v1';
export const BASE_URL = `https://api.pipedrive.com`;
export const PIPEDRIVE_MAX_PAGE_SIZE = 100;
export const PIPEDRIVE_MODULES = [
  'persons',
  'users',
  'deals',
  'organizations',
  'activities',
  'leads',
  'notes',
  'mail_messages',
] as const;
export const PHONE_TYPES = ['mobile', 'work', 'other', 'home'] as const;
export const EMAIL_TYPES = ['work'] as const;
