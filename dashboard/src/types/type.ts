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
  username: string;
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
};

export type CalendarEventFromDB = {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  allday: string;
};