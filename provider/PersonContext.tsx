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

interface Update {
    type: PersonActionType.UPDATE;
    payload: Person;
}

interface Cancel {
    type: PersonActionType.CANCEL;
    payload: number;
}

type PersonAction = Add | Update | Cancel;

const initialState: State = {
    persons: [],
};

const PersonContext = createContext<{
    state: State;
    dispatch: React.Dispatch<PersonAction>;
}>({ state: initialState, dispatch: () => null });
(initialState);

export const enum PersonActionType {
    ADD,
    UPDATE,
    CANCEL,
}

const personReducer = (state:State, action: PersonAction) => {
    switch (action.type) {
        case PersonActionType.ADD:
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
            let persons = state.persons.filter(person => person.id !== action.payload)
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