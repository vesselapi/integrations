import { unification } from '../sdk';
import * as hubspot from './hubspot';
import * as salesforce from './salesforce';

export default unification('crm', {
  hubspot,
  salesforce,
});
