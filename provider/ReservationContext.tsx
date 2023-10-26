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
interface Update {
  type: ReservationActionType.UPDATE;
  payload: Reservation;
}
interface Cancel {
  type: ReservationActionType.CANCEL;
  payload: number;
}
type ReservationAction = Add | Update | Cancel;

const initialState: State = {
  reservations: [],
};

const ReservationContext = createContext<{
  state: State;
  dispatch: React.Dispatch<ReservationAction>;
}>({ state: initialState, dispatch: () => null });
(initialState);

export const enum ReservationActionType {
  ADD,
  UPDATE,
  CANCEL,
}

const reservationReducer = (state:State, action: ReservationAction) => {
  switch (action.type) {
    case ReservationActionType.ADD:
      return {
        ...state,
        reservations: [...state.reservations, action.payload],
      };
    case ReservationActionType.UPDATE:
      return {
        ...state,
        reservations: state.reservations.map(reservation =>
          reservation.id === action.payload.id
            ? action.payload
            : reservation
        ),
      };
    case ReservationActionType.CANCEL:
      return {
        ...state,
        reservations: state.reservations.filter(reservation => reservation.id !== action.payload),
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