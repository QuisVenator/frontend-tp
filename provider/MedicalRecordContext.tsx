import React, { createContext, useContext, useReducer } from 'react';
import { MedicalRecord } from '../models/MedicalRecord';

type State = {
  medicalRecords: MedicalRecord[];
};
interface Add {
  type: MedicalRecordActionType.ADD;
  payload: MedicalRecord;
}
interface Update {
  type: MedicalRecordActionType.UPDATE;
  payload: MedicalRecord;
}
interface Cancel {
  type: MedicalRecordActionType.CANCEL;
  payload: number;
}
type MedicalRecordAction = Add | Update | Cancel;

const initialState: State = {
  medicalRecords: [],
};

const MedicalRecordContext = createContext<{
  state: State;
  dispatch: React.Dispatch<MedicalRecordAction>;
}>({ state: initialState, dispatch: () => null });
(initialState);

export const enum MedicalRecordActionType {
  ADD,
  UPDATE,
  CANCEL,
}

const medicalRecordReducer = (state:State, action: MedicalRecordAction) => {
  switch (action.type) {
    case MedicalRecordActionType.ADD:
      return {
        ...state,
        medicalRecords: [...state.medicalRecords, action.payload],
      };
    case MedicalRecordActionType.UPDATE:
      return {
        ...state,
        medicalRecords: state.medicalRecords.map(MedicalRecord =>
          MedicalRecord.id === action.payload.id
            ? action.payload
            : MedicalRecord
        ),
      };
    default:
      return state;
  }
};

export const MedicalRecordProvider = ({ children }:any) => {
  const [state, dispatch] = useReducer(medicalRecordReducer, initialState);

  return (
    <MedicalRecordContext.Provider value={{ state, dispatch }}>
      {children}
    </MedicalRecordContext.Provider>
  );
};

export const useMedicalRecordContext = () => useContext(MedicalRecordContext);