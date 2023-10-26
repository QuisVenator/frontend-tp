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