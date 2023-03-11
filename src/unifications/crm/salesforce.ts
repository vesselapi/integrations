import { action } from '../../sdk';
import { createLeadSchema } from './schemas';
import { CrmCreateLead } from './types';

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
