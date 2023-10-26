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

export class Category {
	id: number;
	description: string;

	constructor(id: number, description: string) {
		this.id = id;
		this.description = description;
	}
}