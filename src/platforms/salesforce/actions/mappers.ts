import {
  SalesforceContact,
  SalesforceListView,
  SalesforceQueryRecord,
  SalesforceUser,
} from '@/platforms/salesforce/schemas';
import { camel, mapKeys, omit } from 'radash';

export const transformRecord = (record: SalesforceQueryRecord) => {
  return {
    id: record.Id,
    ...mapKeys(omit(record, ['$native']), camel),
  };
};

export const transformContact = (contact: SalesforceContact) => {
  return {
    id: contact.Id,
    firstName: contact.FirstName,
    lastName: contact.LastName,
    title: contact.Title,
    email: contact.Email,
    phone: contact.Phone,
    mobilePhone: contact.MobilePhone,
    createdDate: contact.CreatedDate,
    lastModifiedDate: contact.LastModifiedDate,
    accountId: contact.AccountId,
    ownerId: contact.OwnerId,
  };
};

export const transformListView = (listView: SalesforceListView) => {
  return {
    id: listView.Id,
    name: listView.Name,
    createdDate: listView.CreatedDate,
    lastModifiedDate: listView.LastModifiedDate,
    createdById: listView.CreatedById,
  };
};

export const transformUser = (user: SalesforceUser) => {
  return {
    id: user.Id,
    firstName: user.FirstName,
    lastName: user.LastName,
    email: user.Email,
    createdDate: user.CreatedDate,
    lastModifiedDate: user.LastModifiedDate,
  };
};
