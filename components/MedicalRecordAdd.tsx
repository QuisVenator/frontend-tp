import * as React from 'react';
import { Button, DataTable, TextInput } from 'react-native-paper';
import { ReservationActionType, useReservationContext } from '../provider/ReservationContext';
import { MedicalRecord } from '../models/MedicalRecord';

const MedicalRecordAdd = () => {
  const [medicalRecord, setMedicalRecord] = React.useState<MedicalRecord>({} as MedicalRecord);

  return (
    <React.Fragment>
    <TextInput label={'Doctor'} value={medicalRecord.doctor.name} />
    </React.Fragment>
  );
};

export default MedicalRecordAdd;