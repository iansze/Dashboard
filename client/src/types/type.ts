export type FormValues = {
  username: string;
  password: string;
  email: string;
};

export type Mode = { mode: "signUp" | "login" };

export type SignInResponseData = {
  message: string;
  member: Member;
};

export type Member = {
  member_id?: string;
  membername: string;
  password: string;
  email: string;
};

export type MemberState = {
  currentMember: Member | null;
};

export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  member_id?: string;
};

export type CalendarEventFromDB = {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  allday: string;
};

export type ColumnData = {
  name: string;
};

export type RowData = string[];

export type ConvertedRowData = {
  [key: string]: string | number;
};

export type DataTableProps = {
  query: string;
  tag: string;
};
