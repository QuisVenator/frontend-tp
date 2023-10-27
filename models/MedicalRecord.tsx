import { Person } from "./Person";
import { Category } from "./Reservation";

export type MedicalRecord = {
	id: number;
	patient: Person;
	doctor: Person;
	date: Date;
	reason: string;
	category: Category;
	diagnostic: string;
}