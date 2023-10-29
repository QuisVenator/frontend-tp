import React, { createContext, useContext, useReducer } from 'react';
import { Reservation } from '../models/Reservation';
import storage from './Storage';

type State = {
  reservations: Reservation[];
};
interface Add {
  type: ReservationActionType.ADD;
  payload: Reservation;
}
interface ADD_INITIAL {
  type: ReservationActionType.ADD_INITIAL;
  payload: Reservation;
}
interface Update {
  type: ReservationActionType.UPDATE;
  payload: Reservation;
}
interface Cancel {
  type: ReservationActionType.CANCEL;
  payload: number;
}
type ReservationAction = Add | ADD_INITIAL | Update | Cancel;

const initialState: State = {
  reservations: [],
};

const ReservationContext = createContext<{
  state: State;
  dispatch: React.Dispatch<ReservationAction>;
}>({ state: initialState, dispatch: () => null });
(initialState);

export const enum ReservationActionType {
  ADD_INITIAL,
  ADD,
  UPDATE,
  CANCEL,
}

const reservationReducer = (state:State, action: ReservationAction) => {
  let reservations = [] as Reservation[];
  switch (action.type) {
    case ReservationActionType.ADD:
      reservations = [...state.reservations, action.payload]
      storage.saveObject('reservations', reservations);
      return {
        ...state,
        reservations: reservations,
      };
    case ReservationActionType.ADD_INITIAL:
      return {
        ...state,
        reservations: [...state.reservations, action.payload],
      };
    case ReservationActionType.UPDATE:
      reservations = state.reservations.map(reservation =>
        reservation.id === action.payload.id
          ? action.payload
          : reservation
      )
      return {
        ...state,
        reservations: reservations,
      };
    case ReservationActionType.CANCEL:
      reservations = state.reservations.filter(reservation => reservation.id !== action.payload)
      storage.saveObject('reservations', reservations);
      return {
        ...state,
        reservations: reservations,
      };
    default:
      return state;
  }
};

export const ReservationProvider = ({ children }:any) => {
  const [state, dispatch] = useReducer(reservationReducer, initialState);

  return (
    <ReservationContext.Provider value={{ state, dispatch }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservationContext = () => useContext(ReservationContext);