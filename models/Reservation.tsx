import { Person } from "./Person";

export class Reservation {
	id: number;
	patient: Person;
	doctor: Person;
	date: Date;
	time: Time;

	constructor(id: number, patient: Person, doctor: Person, date: Date, time: Time) {
		this.id = id;
		this.patient = patient;
		this.doctor = doctor;
		this.date = date;
		this.time = time;
	}

	cancel() {
		
	}
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