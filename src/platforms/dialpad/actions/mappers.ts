import {
  DialpadCall,
  DialpadContact,
  DialpadRoutingBreadcrumb,
  DialpadUser,
} from '@/platforms/dialpad/schemas';

export const transformContact = (contact: DialpadContact) => {
  return {
    id: contact.id,
    firstName: contact.first_name,
    lastName: contact.last_name,
    companyName: contact.company_name,
    displayName: contact.display_name,
    emails: contact.emails,
    extension: contact.extension,
    jobTitle: contact.job_title,
    ownerId: contact.owner_id,
    phones: contact.phones,
    primaryEmail: contact.primary_email,
    primaryPhone: contact.primary_phone,
    type: contact.type,
    urls: contact.urls,
  };
};

export const transformRoutingBreadcrumb = (
  breadcrumb: DialpadRoutingBreadcrumb,
) => {
  return {
    breadcrumbType: breadcrumb.breadcrumb_type,
    date: breadcrumb.date,
    request: breadcrumb.request,
    response: {
      body: breadcrumb.response.body,
      headers: breadcrumb.response.headers,
      statusCode: breadcrumb.response.status_code,
    },
    targetId: breadcrumb.target_id,
    targetType: breadcrumb.target_type,
    url: breadcrumb.url,
  };
};

export const transformCall = (call: DialpadCall) => {
  return {
    adminCallRecordingShareLinks: call.admin_call_recording_share_links,
    callId: call.call_id,
    callRecordingIds: call.call_recording_ids,
    callRecordingShareLinks: call.call_recording_share_links,
    contact: transformContact(call.contact),
    csatRecordingUrls: call.csat_recording_urls,
    csatScore: call.csat_score,
    csatTranscriptions: call.csat_transcriptions,
    customData: call.custom_data,
    dateConnected: call.date_connected,
    dateEnded: call.date_ended,
    dateRang: call.date_rang,
    dateStarted: call.date_started,
    direction: call.direction,
    duration: call.duration,
    entryPointCallId: call.entry_point_call_id,
    entryPointTarget: call.entry_point_target,
    eventTimestamp: call.event_timestamp,
    externalNumber: call.external_number,
    groupId: call.group_id,
    internalNumber: call.internal_number,
    isTransferred: call.is_transferred,
    labels: call.labels,
    masterCallId: call.master_call_id,
    mosScore: call.mos_score,
    operatorCallId: call.operator_call_id,
    proxyTarget: call.proxy_target,
    recordingUrl: call.recording_url,
    routingBreadcrumbs: call.routing_breadcrumbs.map(
      transformRoutingBreadcrumb,
    ),
    screenRecordingUrls: call.screen_recording_urls,
    state: call.state,
    target: call.target,
    totalDuration: call.total_duration,
    transcriptionText: call.transcription_text,
    voicemailLink: call.voicemail_link,
    voicemailRecordingId: call.voicemail_recording_id,
    voicemailShareLink: call.voicemail_share_link,
    wasRecorded: call.was_recorded,
  };
};

export const transformUser = (user: DialpadUser) => {
  return {
    adminOfficeIds: user.admin_office_ids,
    companyId: user.company_id,
    country: user.country,
    dateActive: user.date_active,
    dateAdded: user.date_added,
    dateFirstLogin: user.date_first_login,
    doNotDisturb: user.do_not_disturb,
    emails: user.emails,
    firstName: user.first_name,
    id: user.id,
    imageUrl: user.image_url,
    isAdmin: user.is_admin,
    isAvailable: user.is_available,
    isOnDuty: user.is_on_duty,
    isOnline: user.is_online,
    isSuperAdmin: user.is_super_admin,
    language: user.language,
    lastName: user.last_name,
    license: user.license,
    muted: user.muted,
    officeId: user.office_id,
    phoneNumbers: user.phone_numbers,
    state: user.state,
    timezone: user.timezone,
  };
};
