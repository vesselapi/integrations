export const API_VERSION = 'v3';
export const BASE_URL = `https://api.hubapi.com`;
export const HUBSPOT_MAX_PAGE_SIZE = 100;
export const HUBSPOT_DEFINED_CATEGORY = 'HUBSPOT_DEFINED';
export const HUBSPOT_COMMON_ASSOCIATIONS = [
  'companies',
  'contacts',
  'deals',
] as const;
export const HUBSPOT_MODULES = [
  'owners',
  'contacts',
  'deals',
  'companies',
  'notes',
  'tasks',
  'meetings',
  'emails',
  'calls',
  'contact_lists',
] as const;
export const HUBSPOT_PROPERTY_TYPES = [
  'bool',
  'string',
  'number',
  'date',
  'datetime',
  'enumeration',
  'json',
  'phone_number',
  'object_coordinates',
] as const;
export const HUBSPOT_PROPERTY_FIELD_TYPES = [
  'textarea',
  'text',
  'date',
  'file',
  'number',
  'select',
  'radio',
  'checkbox',
  'datetime',
  'booleancheckbox',
] as const;
