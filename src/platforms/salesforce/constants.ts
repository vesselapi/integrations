export const MAX_QUERY_PAGE_SIZE = 200;
export const SALESFORCE_API_VERSION = 'v53.0';
export const SALESFORCE_SUPPORTED_OBJECT_TYPE = [
  'User',
  'Contact',
  'ListView',
  'Account',
  'Opportunity',
  'Lead',
  'Note',
  'ContentNote',
  'Task',
  'Event',
  'EventRelation',
  'EmailMessage',
  'EmailMessageRelation',
] as const;
export const SALESFORCE_CALL_TYPES = [
  'Inbound',
  'Outbound',
  'Internal',
] as const;
export const SALESFORCE_FIELD_TYPES = [
  'boolean',
  'string',
  'picklist',
  'multipicklist',
  'datetime',
  'email',
  'phone',
  'id',
  'percent',
  'reference',
  'url',
  'textarea',
  'double',
  'address',
  'int',
  'date',
  'currency',
  'combobox',
  'base64',
  'location',
  'encryptedstring',
] as const;
export const SALESFORCE_JOB_STATES = [
  'UploadComplete',
  'InProgress',
  'Aborted',
  'JobComplete',
  'Failed',
] as const;
