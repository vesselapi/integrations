import { MailchimpList, MailchimpMember } from '@/platforms/mailchimp/schemas';

export const transformList = (list: MailchimpList) => {
  return {
    id: list.id,
    name: list.name,
    dateCreated: list.date_created,
  };
};

export const transformMember = (member: MailchimpMember) => {
  return {
    id: member.id,
    emailAddress: member.email_address,
    fullName: member.full_name,
    status: member.status,
    lastChanged: member.last_changed,
    timestampSignup: member.timestamp_signup,
  };
};
