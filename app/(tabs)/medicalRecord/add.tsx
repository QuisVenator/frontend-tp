import * as React from "react";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { View } from "../../../components/Themed";

import { PaperSelect } from "react-native-paper-select";
import { DatePickerInput } from "react-native-paper-dates";
import { MedicalRecord } from "../../../models/MedicalRecord";
import { Person } from "../../../models/Person";
import {
  MedicalRecordActionType,
  useMedicalRecordContext,
} from "../../../provider/MedicalRecordContext";
import { router } from 'expo-router';


type MedicalRecordAdd = {
  patientId: string;
  doctorId: string;
  categoryId: string;
  date: Date;
  reason: string;
  diagnostic: string;
};
const MedicalRecordAdd = () => {
  const [medicalRecordAdd, setMedicalRecordAdd] =
    React.useState<MedicalRecordAdd>({} as MedicalRecordAdd);

  const medicalRecordContext = useMedicalRecordContext();

  const patients = [
    {
      _id: "1",
      value: "Patient 1",
    },
    {
      _id: "2",
      value: "Patient 2",
    },
  ];

  const doctors = [
    {
      _id: "1",
      value: "Doctor 1",
    },
    {
      _id: "2",
      value: "Doctor 2",
    },
  ];

  const addMedicalRecord = () => {
    const { doctorId, patientId, ...restData } = medicalRecordAdd;
    const id = medicalRecordContext.state.medicalRecords.length + 1;
    const medicalRecord: MedicalRecord = {
      id,
      ...restData,
      doctor: {
        id: Number(doctorId),
        name: "Doctor 1",
        lastName: "F",
      } as Person,
      patient: {
        id: Number(patientId),
        name: "Patient 1",
        lastName: "R",
      } as Person,
      category: {
        id: 1,
        description: "Category 1",
      },
    };

    medicalRecordContext.dispatch({
      type: MedicalRecordActionType.ADD,
      payload: medicalRecord,
    });
    router.back();
  };
  return (
    <SafeAreaProvider>
      <PaperSelect
        label="Seleccione el doctor"
        value={medicalRecordAdd.doctorId}
        onSelection={(value: any) => {
          setMedicalRecordAdd({
            ...medicalRecordAdd,
            doctorId: value.text,
          });
        }}
        arrayList={doctors}
        selectedArrayList={[]}
        multiEnable={false}
      />
      <PaperSelect
        label="Seleccione el paciente"
        value={medicalRecordAdd.patientId}
        onSelection={(value: any) => {
          setMedicalRecordAdd({
            ...medicalRecordAdd,
            patientId: value.text,
          });
        }}
        arrayList={patients}
        selectedArrayList={[]}
        multiEnable={false}
      />

      <View style={styles.container}>
        <TextInput
          label="Motivo"
          value={medicalRecordAdd.reason}
          onChangeText={(text) =>
            setMedicalRecordAdd({ ...medicalRecordAdd, reason: text })
          }
        />
        <DatePickerInput
          label="Fecha"
          onChange={(date) =>
            setMedicalRecordAdd({ ...medicalRecordAdd, date: date as Date })
          }
          inputMode="start"
          locale="es"
          value={medicalRecordAdd.date}
          presentationStyle="pageSheet"
        />
        <TextInput
          label="Diágnostico"
          value={medicalRecordAdd.diagnostic}
          onChangeText={(text) =>
            setMedicalRecordAdd({ ...medicalRecordAdd, diagnostic: text })
          }
        />
      </View>
      <Button
        icon="plus"
        mode="contained"
        onPress={addMedicalRecord}
        children="Guardar"
      />
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    width: "100%",
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 10,
  },
});

export default MedicalRecordAdd;
