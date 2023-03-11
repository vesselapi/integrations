import { Action } from '../../sdk';

//
// LEAD
//

export type CrmLead = {
  id: string;
  name: string;
  amount: number;
};

export type CrmCreateLead = Action<
  'create-lead',
  {
    name: string;
    amount: number;
  },
  CrmLead
>;

export type CrmFindLead = Action<
  'find-lead',
  {
    id: string;
  },
  CrmLead | null
>;
