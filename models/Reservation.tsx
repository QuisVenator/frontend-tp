import { Person } from "./Person";

export type Reservation = {
	id: number;
	patient: Person;
	doctor: Person;
	date: Date;
	time: Time;
}

export type Time = {
    hours: number;
    minutes: number;
}

export type Category = {
	id: number;
	description: string;
}

export const availableTimes = [
  { hours: 9, minutes: 0 },
  { hours: 10, minutes: 0 },
  { hours: 11, minutes: 0 },
  { hours: 12, minutes: 0 },
  { hours: 13, minutes: 0 },
  { hours: 14, minutes: 0 },
  { hours: 15, minutes: 0 },
  { hours: 16, minutes: 0 },
  { hours: 17, minutes: 0 },
  { hours: 18, minutes: 0 },
  { hours: 19, minutes: 0 },
  { hours: 20, minutes: 0 },
] as Time[];

export function timeToString(time: Time) {
  return time.hours.toString().padStart(2, '0') + ":" + time.minutes.toString().padStart(2, '0') + "-" + (time.hours+1).toString().padStart(2, '0') + ":" + time.minutes.toString().padStart(2, '0');
}