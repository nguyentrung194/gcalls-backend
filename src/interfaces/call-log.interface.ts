export interface CallLog {
  _id: string;
  phoneNumber: string;
  date: Date;
  duration: number;
  event: string;
  originator: string;
  name: string;
  from: string;
}
