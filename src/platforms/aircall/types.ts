export type AircallPagination = {
  count: number;
  total: number;
  current_page: number;
  per_page: number;
  next_page_link: string;
  previous_page_link: string;
};

export type AircallUser = {
  id: number;
  direct_link: string;
  name: string;
  email: string;
  available: boolean;
  availability_status: string;
  created_at: string;
  time_zone: string;
  language: string;
  wrap_up_time: number;
};

export type AircallContact = {
  id: number;
  direct_link: string;
  first_name: string;
  last_name: string;
  company_name: string;
  information: string;
  is_shared: boolean;
  created_at: number; // Timestamp
  updated_at: number; // Timestamp
  emails: {
    id: number;
    label: 'Work';
    value: string;
  }[];
  phone_numbers: {
    id: number;
    label: 'Mobile';
    value: string;
  }[];
};

export type AircallCall = {
  id: number;
  direct_link: number;
  direction: 'outbound';
  status: 'done';
  missed_call_reason: null;
  started_at: number; // Timestamp
  answered_at: number; // Timestamp
  ended_at: number; // Timestamp
  duration: number;
  voicemail: null;
  recording: null;
  asset: null;
  raw_digits: string;
  user: {
    id: number;
    direct_link: string;
    name: string;
    email: string;
    available: boolean;
    availability_status: string;
    created_at: string;
    time_zone: string;
    language: string;
  };
  contact: null;
  archived: boolean;
  assigned_to: null;
  transferred_by: null;
  transferred_to: null;
  cost: string;
  number: {
    id: number;
    direct_link: string;
    name: string;
    digits: string;
    created_at: string;
    country: string;
    time_zone: string;
    open: boolean;
    availability_status: 'custom';
    is_ivr: boolean;
    live_recording_activated: boolean;
    priority: null;
    messages: {};
  };
  comments: [
    {
      id: number;
      content: string;
      posted_at: number;
      posted_by: {
        id: number;
        direct_link: string;
        name: string;
        email: string;
        available: boolean;
        availability_status: 'available';
        created_at: string;
      };
    },
  ];
  tags: [
    {
      id: number;
      name: string;
      created_at: number;
      tagged_by: {
        id: number;
        direct_link: string;
        name: string;
        email: string;
        available: boolean;
        availability_status: 'available';
        created_at: string;
      };
    },
  ];
  teams: {
    id: number;
    name: string;
    direct_link: string;
    created_at: string;
  }[];
};
