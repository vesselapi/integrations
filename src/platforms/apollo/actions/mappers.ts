import {
  ApolloAccount,
  ApolloCall,
  ApolloCallDisposition,
  ApolloContact,
  ApolloEmailActivity,
  ApolloEmailMessage,
  ApolloLabel,
  ApolloPaginatedResponse,
  ApolloPerson,
  ApolloSequence,
  ApolloTask,
  ApolloUser,
} from '@/platforms/apollo/schemas';

export const transformAccount = (account: ApolloAccount) => {
  return {
    id: account.id,
    name: account.name,
    websiteUrl: account.website_url,
    estimatedNumEmployees: account.estimated_num_employees,
    industry: account.industry,
    organizationRawAddress: account.organization_raw_address,
    organizationCity: account.organization_city,
    organizationStreetAddress: account.organization_street_address,
    organizationState: account.organization_state,
    organizationCountry: account.organization_country,
    organizationPostalCode: account.organization_postal_code,
    domain: account.domain,
    ownerId: account.owner_id,
    lastActivityDate: account.last_activity_date,
    sanitizedPhone: account.sanitized_phone,
    createdAt: account.created_at,
  };
};

export const transformContact = (contact: ApolloContact) => {
  return {
    id: contact.id,
    firstName: contact.first_name,
    lastName: contact.last_name,
    name: contact.name,
    title: contact.title,
    ownerId: contact.owner_id,
    presentRawAddress: contact.present_raw_address,
    phoneNumbers: contact.phone_numbers.map((phone) => {
      return {
        rawNumber: phone.raw_number,
        sanitizedNumber: phone.sanitized_number,
        type: phone.type,
        position: phone.position,
        status: phone.status,
        dncStatus: phone.dnc_status,
      };
    }),
    organizationName: contact.organization_name,
    email: contact.email,
    websiteUrl: contact.website_url,
    contactStageId: contact.contact_stage_id,
    accountId: contact.account_id,
    createdAt: contact.created_at,
    updatedAt: contact.updated_at,
    typedCustomFields: contact.typed_custom_fields,
  };
};

export const transformEmailMessage = (message: ApolloEmailMessage) => {
  return {
    id: message.id,
    bodyText: message.body_text,
    bodyHtml: message.body_html,
    bounce: message.bounce,
    completedAt: message.completed_at,
    contactId: message.contact_id,
    createdAt: message.created_at,
    emailerCampaignId: message.emailer_campaign_id,
    fromEmail: message.from_email,
    fromName: message.from_name,
    numClicks: message.num_clicks,
    numOpens: message.num_opens,
    replied: message.replied,
    status: message.status,
    subject: message.subject,
    userId: message.user_id,
  };
};

export const transformEmailActivity = (activity: ApolloEmailActivity) => {
  return {
    id: activity.id,
    type: activity.type,
    emailerMessageId: activity.emailer_message_id,
    emailerMessage: transformEmailMessage(activity.emailer_message),
  };
};

export const transformTask = (task: ApolloTask) => {
  return {
    id: task.id,
    userId: task.user_id,
    createdAt: task.created_at,
    completedAt: task.completed_at,
    note: task.note,
    skippedAt: task.skipped_at,
    dueAt: task.due_at,
    type: task.type,
    priority: task.priority,
    status: task.status,
    answered: task.answered,
    emailerCampaignId: task.emailer_campaign_id,
    contactId: task.contact_id,
    personId: task.person_id,
    accountId: task.account_id,
    organizationId: task.organization_id,
    personaIds: task.persona_ids,
    subject: task.subject,
    createdFrom: task.created_from,
    salesforceType: task.salesforce_type,
    playbookStepIds: task.playbook_step_ids,
    playbookId: task.playbook_id,
    needsPlaybookAutoprospecting: task.needs_playbook_autoprospecting,
    starredByUserIds: task.starred_by_user_ids,
    salesforceId: task.salesforce_id,
    hubspotId: task.hubspot_id,
  };
};

export const transformCall = (call: ApolloCall) => {
  return {
    id: call.id,
    userId: call.user_id,
    contactId: call.contact_id,
    accountId: call.account_id,
    dispositionId: call.phone_call_outcome_id,
    recordingUrl: call.recording_url,
    inbound: call.inbound,
    fromNumber: call.from_number,
    toNumber: call.to_number,
    startTime: call.start_time,
    endTime: call.end_time,
    noteText: call.note_text,
    duration: call.duration,
  };
};

export const transformDisposition = (disposition: ApolloCallDisposition) => {
  return {
    id: disposition.id,
    teamId: disposition.team_id,
    name: disposition.name,
    answered: disposition.answered,
    order: disposition.order,
    triggerContactStageId: disposition.trigger_contact_stage_id,
    sentiment: disposition.sentiment,
  };
};

export const transformSequence = (sequence: ApolloSequence) => {
  return {
    id: sequence.id,
    name: sequence.name,
    createdAt: sequence.created_at,
    active: sequence.active,
    labelIds: sequence.label_ids,
    numSteps: sequence.num_steps,
    userId: sequence.user_id,
    uniqueScheduled: sequence.unique_scheduled,
    uniqueDelivered: sequence.unique_delivered,
    uniqueBounced: sequence.unique_bounced,
    uniqueOpened: sequence.unique_opened,
    uniqueReplied: sequence.unique_replied,
    uniqueDemoed: sequence.unique_demoed,
    uniqueClicked: sequence.unique_clicked,
    uniqueUnsubscribed: sequence.unique_unsubscribed,
    bounceRate: sequence.bounce_rate,
    openRate: sequence.open_rate,
    clickRate: sequence.click_rate,
    replyRate: sequence.reply_rate,
    spamBlockedRate: sequence.spam_blocked_rate,
    optOutRate: sequence.opt_out_rate,
    demoRate: sequence.demo_rate,
  };
};

export const transformUser = (user: ApolloUser) => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    teamId: user.team_id,
    createdAt: user.created_at,
  };
};

export const transformLabel = (label: ApolloLabel) => {
  return {
    id: label.id,
    name: label.name,
    createdAt: label.created_at,
    updatedAt: label.updated_at,
  };
};

export const transformPerson = (person: ApolloPerson) => {
  return {
    id: person.id,
    firstName: person.first_name,
    lastName: person.last_name,
    name: person.name,
  };
};

export const transformPagination = (pagination: ApolloPaginatedResponse) => {
  return {
    page: pagination.page,
    perPage: pagination.per_page,
    totalEntries: pagination.total_entries,
    totalPages: pagination.total_pages,
  };
};
