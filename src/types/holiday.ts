import { days } from "./mainEnums";
export interface IHoliday {
  id?: number;
  date: string;
  day: days;
  holidayName: string;
}
