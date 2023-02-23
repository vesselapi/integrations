import { createLead } from './actions/create-lead';
import hubspot from './platform';

hubspot.actions.register([createLead]);

export default hubspot;
