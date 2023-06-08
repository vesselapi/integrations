import {
  AircallCall,
  AircallContact,
  AircallUser,
} from '@/platforms/aircall/schemas';

export const transformUser = (user: AircallUser) => {
  return {
    id: user.id,
    directLink: user.direct_link,
    name: user.name,
    email: user.email,
    available: user.available,
    availabilityStatus: user.availability_status,
    timeZone: user.time_zone,
    language: user.language,
    wrapUpTime: user.wrap_up_time,
    createdAt: user.created_at,
  };
};

export const transformContact = (contact: AircallContact) => {
  return {
    id: contact.id,
    directLink: contact.direct_link,
    firstName: contact.first_name,
    lastName: contact.last_name,
    companyName: contact.company_name,
    information: contact.information,
    isShared: contact.is_shared,
    createdAt: contact.created_at,
    updatedAt: contact.updated_at,
    emails: contact.emails,
    phoneNumbers: contact.phone_numbers,
  };
};

export const transformCall = (call: AircallCall) => {
  return {
    id: call.id,
    directLink: call.direct_link,
    direction: call.direction,
    status: call.status,
    startedAt: call.started_at,
    answeredAt: call.answered_at,
    endedAt: call.ended_at,
    duration: call.duration,
    voicemail: call.voicemail,
    recording: call.recording,
    rawDigits: call.raw_digits,
    user: transformUser(call.user),
    contact: call.contact ? transformContact(call.contact) : null,
    number: {
      id: call.number.id,
      name: call.number.name,
      digits: call.number.digits,
      createdAt: call.number.created_at,
    },
    participants: call.participants?.map((participant) => {
      return {
        id: participant.id,
        type: participant.type,
        name: participant.name,
        phoneNumber: participant.phone_number,
      };
    }),
  };
};
