import AsyncStorage from '@react-native-async-storage/async-storage';
import { Person } from '../models/Person';
import { Category } from '../models/Category';
import { Reservation } from '../models/Reservation';
import { ReservationActionType, useReservationContext } from './ReservationContext';


export class Storage {
  loaded: boolean = false;

  constructor() {}

  saveObject(key: string, data: any) {
    AsyncStorage.setItem(key, JSON.stringify(data));
  }

  getObject(key: string) {
    return AsyncStorage.getItem(key)
  }

  clear() {
    AsyncStorage.clear();
  }
}

const storage = new Storage();

export default storage;

export const loadMockData = (): Reservation[] => {
  let persons: Person[] = [
    {id: 1, name: 'John', lastName: 'Doe', phone: '595123456789', email: 'asdf@example.com', cedula: '123456', flag_is_doctor: false},
    {id: 2, name: 'Mary', lastName: 'Doe', phone: '595321456789', email: 'qwer@example.com', cedula: '123457', flag_is_doctor: true},
    {id: 3, name: 'Fernando', lastName: 'Smith', phone: '595321456789', email: 'fer@example.com', cedula: '123456', flag_is_doctor: false},
    {id: 4, name: 'Doctor', lastName: 'Gonzalez', phone: '595321456789', email: 'doctor@example.com', cedula: '123456', flag_is_doctor: true},
  ];
  let categories: Category[] = [
    {id: 1, description: 'Category 1'},
    {id: 2, description: 'Category 2'},
  ]
  let reservations: Reservation[] = [  
    {id: 1, patient: persons[0], doctor: persons[1], date: new Date("2023-09-01 00:00:00"), time: { hours: 10, minutes: 0 }},
    {id: 2, patient: persons[0], doctor: persons[1], date: new Date("2023-09-01 00:00:00"), time: { hours: 11, minutes: 0 }},
    {id: 3, patient: persons[2], doctor: persons[3], date: new Date("2023-09-02 00:00:00"), time: { hours: 10, minutes: 0 }},
  ];

  storage.saveObject('persons', persons,);
  storage.saveObject('categories', categories,);
  storage.saveObject('reservations', reservations,);

  return reservations
}

export const loadMockDataPersons = (): Person[] => {
  let persons: Person[] = [
    {id: 1, name: 'John', lastName: 'Doe', phone: '595123456789', email: 'asdf@example.com', cedula: '123456', flag_is_doctor: false},
    {id: 2, name: 'Mary', lastName: 'Doe', phone: '595321456789', email: 'qwer@example.com', cedula: '123457', flag_is_doctor: true},
    {id: 3, name: 'Fernando', lastName: 'Smith', phone: '595321456789', email: 'fer@example.com', cedula: '123456', flag_is_doctor: false},
    {id: 4, name: 'Doctor', lastName: 'Gonzalez', phone: '595321456789', email: 'doctor@example.com', cedula: '123456', flag_is_doctor: true},
  ];

  storage.saveObject('persons', persons,);

  return persons
}

export const loadMockDataCategories = (): Category[] => {
  let categories: Category[] = [
    {id: 1, description: 'Category 1'},
    {id: 2, description: 'Category 2'},
  ]

  storage.saveObject('categories', categories,);

  return categories;
}