/**
 * Calls and Contacts are limited to 10,000 items, even with pagination on.
 */
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
