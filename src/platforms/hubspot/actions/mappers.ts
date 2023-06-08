import {
  HubspotAssociationResponse,
  HubspotCall,
  HubspotCompany,
  HubspotContact,
  HubspotContactList,
  HubspotContactListContact,
  HubspotDeal,
  HubspotEmail,
  HubspotMeeting,
  HubspotNote,
  HubspotOwner,
  HubspotProperty,
  HubspotTask,
} from '@/platforms/hubspot/schemas';

export const transformOwner = (owner: HubspotOwner) => {
  return {
    id: owner.id,
    createdAt: owner.createdAt,
    updatedAt: owner.updatedAt,
    firstName: owner.firstName,
    lastName: owner.lastName,
    email: owner.email,
  };
};

export const transformContact = (contact: HubspotContact) => {
  return {
    id: contact.id,
    createdAt: contact.createdAt,
    updatedAt: contact.updatedAt,
    firstName: contact.properties.firstname,
    lastName: contact.properties.lastname,
    email: contact.properties.email,
    jobTitle: contact.properties.jobtitle,
    phone: contact.properties.phone,
    mobilePhone: contact.properties.mobilephone,
    hsLeadStatus: contact.properties.hs_lead_status,
    company: contact.properties.company,
    hubspotOwnerId: contact.properties.hubspot_owner_id,
    hsAllContactVids: contact.properties.hs_all_contact_vids,
  };
};

export const transformDeal = (deal: HubspotDeal) => {
  return {
    id: deal.id,
    createdAt: deal.createdAt,
    updatedAt: deal.updatedAt,
    amount: deal.properties.amount,
    dealName: deal.properties.dealname,
    closeDate: deal.properties.closedate,
    dealStage: deal.properties.dealstage,
    hsDealStageProbability: deal.properties.hs_deal_stage_probability,
    hsProjectedAmount: deal.properties.hs_projected_amount,
    hsIsClosedWon: deal.properties.hs_is_closed_won,
    hsIsClosed: deal.properties.hs_is_closed,
    hubspotOwnerId: deal.properties.hubspot_owner_id,
  };
};

export const transformCompany = (company: HubspotCompany) => {
  return {
    id: company.id,
    createdAt: company.createdAt,
    updatedAt: company.updatedAt,
    name: company.properties.name,
    website: company.properties.website,
    industry: company.properties.industry,
    phone: company.properties.phone,
    address: company.properties.address,
    city: company.properties.city,
    state: company.properties.state,
    zip: company.properties.zip,
    country: company.properties.country,
    numberOfEmployees: company.properties.numberofemployees,
    annualRevenue: company.properties.annualrevenue,
    description: company.properties.description,
    hubspotOwnerId: company.properties.hubspot_owner_id,
  };
};

export const transformNote = (note: HubspotNote) => {
  return {
    id: note.id,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
    hubspotOwnerId: note.properties.hubspot_owner_id,
    hsNoteBody: note.properties.hs_note_body,
  };
};

export const transformTask = (task: HubspotTask) => {
  return {
    id: task.id,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    hsTaskBody: task.properties.hs_task_body,
    hsTaskSubject: task.properties.hs_task_subject,
    hsTaskStatus: task.properties.hs_task_status,
    hsTimestamp: task.properties.hs_timestamp,
    hsTaskPriority: task.properties.hs_task_priority,
    hubspotOwnerId: task.properties.hubspot_owner_id,
  };
};

export const transformMeeting = (meeting: HubspotMeeting) => {
  return {
    id: meeting.id,
    createdAt: meeting.createdAt,
    updatedAt: meeting.updatedAt,
    hsTimestamp: meeting.properties.hs_timestamp,
    hsMeetingTitle: meeting.properties.hs_meeting_title,
    hsMeetingBody: meeting.properties.hs_meeting_body,
    hsMeetingLocation: meeting.properties.hs_meeting_location,
    hsMeetingStartTime: meeting.properties.hs_meeting_start_time,
    hsMeetingEndTime: meeting.properties.hs_meeting_end_time,
    hubspotOwnerId: meeting.properties.hubspot_owner_id,
  };
};

export const transformEmail = (email: HubspotEmail) => {
  return {
    id: email.id,
    createdAt: email.createdAt,
    updatedAt: email.updatedAt,
    hsEmailFromEmail: email.properties.hs_email_from_email,
    hsEmailToEmail: email.properties.hs_email_to_email,
    hsEmailCcEmail: email.properties.hs_email_cc_email,
    hsEmailBccEmail: email.properties.hs_email_bcc_email,
    hsEmailHtml: email.properties.hs_email_html,
    hsEmailText: email.properties.hs_email_text,
    hsEmailDirection: email.properties.hs_email_direction,
    hsEmailSubject: email.properties.hs_email_subject,
    hsEmailBounceErrorDetailStatusCode:
      email.properties.hs_email_bounce_error_detail_status_code,
    hsAttachmentIds: email.properties.hs_attachment_ids,
    hsTimestamp: email.properties.hs_timestamp,
    hsEmailStatus: email.properties.hs_email_status,
    hubspotOwnerId: email.properties.hubspot_owner_id,
  };
};

export const transformCall = (call: HubspotCall) => {
  return {
    id: call.id,
    createdAt: call.createdAt,
    updatedAt: call.updatedAt,
    hsCallDisposition: call.properties.hs_call_disposition,
    hsCallDirection: call.properties.hs_call_direction,
    hsTimestamp: call.properties.hs_timestamp,
    hsCallBody: call.properties.hs_call_body,
    hsCallTitle: call.properties.hs_call_title,
    hubspotOwnerId: call.properties.hubspot_owner_id,
  };
};

export const transformContactList = (list: HubspotContactList) => {
  return {
    id: list.listId,
    createdAt: list.createdAt,
    updatedAt: list.updatedAt,
    name: list.name,
    dynamic: list.dynamic,
  };
};

export const transformContactListContact = (
  contact: HubspotContactListContact,
) => {
  return {
    id: contact.vid,
  };
};

export const transformProperty = (property: HubspotProperty) => {
  return {
    name: property.name,
    label: property.label,
    type: property.type,
    fieldType: property.fieldType,
    hubspotDefined: property.hubspotDefined,
    options: property.options,
    modificationMetadata: property.modificationMetadata,
  };
};

export const transformAssociation = (
  association: HubspotAssociationResponse,
) => {
  return {
    from: association.from?.id,
    to: association.to?.id,
    category: association.associationSpec?.associationCategory,
    typeId: association.associationSpec?.associationTypeId,
  };
};
