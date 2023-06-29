import {
  SalesloftCadence,
  SalesloftCadenceMembership,
  SalesloftCustomField,
  SalesloftEmail,
  SalesloftEmailBody,
  SalesloftMetadata,
  SalesloftPerson,
  SalesloftTag,
  SalesloftUser,
} from '@/platforms/salesloft/schemas';

export const transformCadenceMembership = (
  membership: SalesloftCadenceMembership,
) => {
  return {
    id: membership.id,
    addedAt: membership.added_at,
    createdAt: membership.created_at,
    updatedAt: membership.updated_at,
    personDeleted: membership.person_deleted,
    currentlyOnCadence: membership.currently_on_cadence,
    currentState: membership.current_state,
    cadence: membership.cadence,
    person: membership.person,
    user: membership.user,
    latestAction: membership.latest_action,
    counts: membership.counts
      ? {
          views: membership.counts?.views,
          clicks: membership.counts?.clicks,
          replies: membership.counts?.replies,
          calls: membership.counts?.calls,
          sentEmails: membership.counts?.sent_emails,
          bounces: membership.counts?.bounces,
        }
      : null,
  };
};

export const transformCadence = (cadence: SalesloftCadence) => {
  return {
    id: cadence.id,
    createdAt: cadence.created_at,
    updatedAt: cadence.updated_at,
    name: cadence.name,
    archivedAt: cadence.archived_at,
    teamCadence: cadence.team_cadence,
    shared: cadence.shared,
    removeBouncesEnabled: cadence.remove_bounces_enabled,
    removeRepliesEnabled: cadence.remove_replies_enabled,
    optOutLinkIncluded: cadence.opt_out_link_included,
    draft: cadence.draft,
    cadenceFrameworkId: cadence.cadence_framework_id,
    cadenceFunction: cadence.cadence_function,
    externalIdentifier: cadence.external_identifier,
    tags: cadence.tags,
    counts: cadence.counts
      ? {
          cadencePeople: cadence.counts?.cadence_people,
          peopleActedOnCount: cadence.counts?.people_acted_on_count,
          targetDailyPeople: cadence.counts?.target_daily_people,
          opportunitiesCreated: cadence.counts?.opportunities_created,
          meetingsBooked: cadence.counts?.meetings_booked,
        }
      : null,
  };
};

export const transformCustomField = (field: SalesloftCustomField) => {
  return {
    id: field.id,
    createdAt: field.created_at,
    updatedAt: field.updated_at,
    name: field.name,
    fieldType: field.field_type,
    valueType: field.value_type,
  };
};

export const transformEmailBody = (body: SalesloftEmailBody) => {
  return {
    id: body.id,
    mailbox: body.mailbox,
    messageId: body.message_id,
    raw: body.raw,
  };
};

export const transformEmail = (email: SalesloftEmail) => {
  return {
    id: email.id,
    createdAt: email.created_at,
    updatedAt: email.updated_at,
    recipientEmailAddress: email.recipient_email_address,
    status: email.status,
    bounced: email.bounced,
    sendAfter: email.send_after,
    sentAt: email.sent_at,
    viewTracking: email.view_tracking,
    clickTracking: email.click_tracking,
    subject: email.subject,
    errorMessage: email.error_message,
    counts: email.counts
      ? {
          clicks: email.counts?.clicks,
          views: email.counts?.views,
          replies: email.counts?.replies,
          uniqueDevices: email.counts?.unique_devices,
          uniqueLocations: email.counts?.unique_locations,
          attachments: email.counts?.attachments,
        }
      : null,
    user: email.user,
    cadence: email.cadence,
  };
};

export const transformPerson = (person: SalesloftPerson) => {
  return {
    id: person.id,
    firstName: person.first_name,
    lastName: person.last_name,
    city: person.city,
    state: person.state,
    country: person.country,
    title: person.title,
    owner: person.owner,
    account: person.account,
    phone: person.phone,
    homePhone: person.home_phone,
    mobilePhone: person.mobile_phone,
    emailAddress: person.email_address,
    secondaryEmailAddress: person.secondary_email_address,
    personalEmailAddress: person.personal_email_address,
    createdAt: person.created_at,
    updatedAt: person.updated_at,
    counts: {
      emailsSent: person.counts.emails_sent,
      emailsViewed: person.counts.emails_viewed,
      emailsClicked: person.counts.emails_clicked,
      emailsRepliedTo: person.counts.emails_replied_to,
      emailsBounced: person.counts.emails_bounced,
      calls: person.counts.calls,
    },
    customFields: person.custom_fields,
  };
};

export const transformUser = (user: SalesloftUser) => {
  return {
    id: user.id,
    guid: user.guid,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    firstName: user.first_name,
    name: user.name,
    lastName: user.last_name,
    jobRole: user.job_role,
    active: user.active,
    timeZone: user.time_zone,
    slackUsername: user.slack_username,
    twitterHandle: user.twitter_handle,
    email: user.email,
    emailClientEmailAddress: user.email_client_email_address,
    sendingEmailAddress: user.sending_email_address,
    fromAddress: user.from_address,
    fullEmailAddress: user.full_email_address,
    bccEmailAddress: user.bcc_email_address,
    workCountry: user.work_country,
    emailSignature: user.email_signature,
    emailSignatureType: user.email_signature_type,
    emailSignatureClickTrackingDisabled:
      user.email_signature_click_tracking_disabled,
    teamAdmin: user.team_admin,
    localDialEnabled: user.local_dial_enabled,
    clickToCallEnabled: user.click_to_call_enabled,
    emailClientConfigured: user.email_client_configured,
    crmConnected: user.crm_connected,
  };
};

export const transformTag = (tag: SalesloftTag) => {
  return {
    id: tag.id,
    name: tag.name,
  };
};

export const transformMetadata = (metadata: SalesloftMetadata) => {
  return {
    paging: metadata.paging
      ? {
          perPage: metadata.paging.per_page,
          currentPage: metadata.paging.current_page,
          nextPage: metadata.paging.next_page,
          prevPage: metadata.paging.prev_page,
        }
      : null,
  };
};
