import { action } from '../../sdk';
import { createLeadSchema, findLeadSchema } from './schemas';
import { CrmCreateLead, CrmFindLead } from './types';

export const createLead: CrmCreateLead = action(
  'create-lead',
  {
    schema: createLeadSchema,
  },
  async ({ auth, input }) => {
    return {
      id: '',
      name: '',
      amount: 0,
    };
  },
);

export const findLead: CrmFindLead = action(
  'find-lead',
  {
    schema: findLeadSchema,
  },
  async ({ auth, input }) => {
    return {
      id: '',
      name: '',
      amount: 0,
    };
  },
);
