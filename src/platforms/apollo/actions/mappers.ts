import {
  ApolloAccount,
  ApolloContact,
  ApolloEmailActivity,
  ApolloEmailMessage,
  ApolloSequence,
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
