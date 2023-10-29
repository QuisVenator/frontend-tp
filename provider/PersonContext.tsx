import React, { createContext, useContext, useReducer } from 'react';
import { Person } from '../models/Person';
import storage from './Storage';

type State = {
  persons: Person[];
};

interface Add {
  type: PersonActionType.ADD;
  payload: Person;
}
interface ADD_INITIAL {
    type: PersonActionType.ADD_INITIAL;
    payload: Person;
  }

interface Update {
    type: PersonActionType.UPDATE;
    payload: Person;
}

interface Cancel {
    type: PersonActionType.CANCEL;
    payload: number;
}

type PersonAction = Add | ADD_INITIAL | Update | Cancel;

const initialState: State = {
    persons: [],
};

const PersonContext = createContext<{
    state: State;
    dispatch: React.Dispatch<PersonAction>;
}>({ state: initialState, dispatch: () => null });
(initialState);

export const enum PersonActionType {
    ADD_INITIAL,
    ADD,
    UPDATE,
    CANCEL,
}

const personReducer = (state:State, action: PersonAction) => {
    let persons = [] as Person[];
    switch (action.type) {
        case PersonActionType.ADD:
            persons = [...state.persons, action.payload]
            storage.saveObject('persons', persons);
            return {
                ...state,
                persons: [...state.persons, action.payload],
            };
        case PersonActionType.ADD_INITIAL:
            return {
                ...state,
                persons: [...state.persons, action.payload],
            };
        case PersonActionType.UPDATE:
            return {
                ...state,
                persons: state.persons.map(person =>
                    person.id === action.payload.id
                        ? action.payload
                        : person
                ),
            };
        case PersonActionType.CANCEL:
            persons = state.persons.filter(person => person.id !== action.payload)
            storage.saveObject('persons', persons);
            return {
                ...state,
                persons: persons,
            };
        default:
            return state;
    }
}

export const PersonProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(personReducer, initialState);
    return (
        <PersonContext.Provider value={{ state, dispatch }}>
            {children}
        </PersonContext.Provider>
    );
}

export const usePersonContext = () => useContext(PersonContext);