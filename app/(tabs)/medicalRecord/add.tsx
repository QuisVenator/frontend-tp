import * as React from "react";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { View } from "../../../components/Themed";

import { PaperSelect } from "react-native-paper-select";
import { DatePickerInput } from "react-native-paper-dates";
import { MedicalRecord } from "../../../models/MedicalRecord";
import {
  MedicalRecordActionType,
  useMedicalRecordContext,
} from "../../../provider/MedicalRecordContext";
import { router, useLocalSearchParams } from "expo-router";
import { usePersonContext } from "../../../provider/PersonContext";
import { useCategoryContext } from "../../../provider/CategoryContext";
import { Reservation } from "../../../models/Reservation";
import { useReservationContext } from "../../../provider/ReservationContext";

type MedicalRecordAdd = {
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  categoryId: string;
  categoryDescription: string;
  date: Date;
  reason: string;
  diagnostic: string;
};
const MedicalRecordAdd = () => {
  const [medicalRecordAdd, setMedicalRecordAdd] =
    React.useState<MedicalRecordAdd>({} as MedicalRecordAdd);

  const medicalRecordContext = useMedicalRecordContext();
  const {
    state: { persons },
  } = usePersonContext();
  const {
    state: { categories },
  } = useCategoryContext();
  const {
    state: { reservations },
  } = useReservationContext();

  const patients = persons.filter((p) => !p.flag_is_doctor);
  const doctors = persons.filter((p) => p.flag_is_doctor);

  const patientList = patients.map((p) => ({
    _id: p.id.toString(),
    value: `${p.name} ${p.lastName}`,
  }));

  const doctorList = doctors.map((p) => ({
    _id: p.id.toString(),
    value: `${p.name} ${p.lastName}`,
  }));

  const categoryList = categories.map((c) => ({
    _id: c.id.toString(),
    value: c.description,
  }));


  const searchParams = useLocalSearchParams()
  const [foundReservation, setFoundReservation] =
    React.useState<Reservation>({} as Reservation);

  React.useEffect(() => {
    if (searchParams.passedResId !== "-1") {
      const passedResId: number = +searchParams.passedResId;
      const foundReservationObj = reservations.filter(reservation => reservation.id === passedResId)[0];
      setFoundReservation(foundReservationObj);

      if (foundReservationObj) {
        setMedicalRecordAdd({
          ...medicalRecordAdd,
          doctorId: foundReservationObj.doctor.id.toString(),
          doctorName: foundReservationObj.doctor.name + " " + foundReservationObj.doctor.lastName,
          patientId: foundReservationObj.patient.id.toString(),
          patientName: foundReservationObj.patient.name + " " + foundReservationObj.patient.lastName,
          date: foundReservationObj.date,
        });
      }
      router.setParams({ passedResId: "-1" });
    } 
  }, [searchParams]);

  // console.log(foundReservation);


  const addMedicalRecord = () => {
    const { doctorId, patientId, categoryId, ...restData } = medicalRecordAdd;
    const id = medicalRecordContext.state.medicalRecords.length + 1;

    const patient = patients.find((p) => p.id === Number(patientId));
    if (!patient) return;

    const doctor = doctors.find((p) => p.id === Number(doctorId));
    if (!doctor) return;

    const category = categories.find((p) => p.id === Number(categoryId));
    if (!category) return;

    const medicalRecord: MedicalRecord = {
      id,
      ...restData,
      doctor,
      patient,
      category,
    };

    medicalRecordContext.dispatch({
      type: MedicalRecordActionType.ADD,
      payload: medicalRecord,
    });
    router.push("/medicalRecord");
  };
  return (
    <React.Fragment>
      <View style={{ width: '100%', height: 56 }}>
        <SafeAreaProvider>
          <PaperSelect
            label="Seleccione el doctor"
            value={medicalRecordAdd.doctorName || ((foundReservation && foundReservation.doctor)? `${foundReservation.doctor.name} ${foundReservation.doctor.lastName}` : '')}
            onSelection={(value) => {
              setMedicalRecordAdd({
                ...medicalRecordAdd,
                doctorId: value.selectedList[0]._id,
                doctorName: value.selectedList[0].value,
              });
            }}
            arrayList={doctorList}
            selectedArrayList={(foundReservation && foundReservation.doctor)
              ? [{ _id: foundReservation.doctor.id.toString(), value: `${foundReservation.doctor.name} ${foundReservation.doctor.lastName}` }]
              : [{ _id: '', value: '' }]
            }
            multiEnable={false}
          />
          <PaperSelect
            label="Seleccione el paciente"
            value={medicalRecordAdd.patientName || ((foundReservation && foundReservation.patient)? `${foundReservation.patient.name} ${foundReservation.patient.lastName}` : '')}
            onSelection={(value: any) => {
              setMedicalRecordAdd({
                ...medicalRecordAdd,
                patientId: value.selectedList[0]._id,
                patientName: value.selectedList[0].value,
              });
            }}
            arrayList={patientList}
            selectedArrayList={(foundReservation && foundReservation.patient)
              ? [{ _id: foundReservation.patient.id.toString(), value: `${foundReservation.patient.name} ${foundReservation.patient.lastName}` }]
              : [{ _id: '', value: '' }]
            }
            multiEnable={false}
          />
          <PaperSelect
            label="Seleccione la categoria"
            value={medicalRecordAdd.categoryDescription}
            onSelection={(value: any) => {
              setMedicalRecordAdd({
                ...medicalRecordAdd,
                categoryId: value.selectedList[0]._id,
                categoryDescription: value.selectedList[0].value,
              });
            }}
            arrayList={categoryList}
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
              value={
                medicalRecordAdd.date || ((foundReservation && foundReservation.date)
                  ? foundReservation.date : medicalRecordAdd.date)
              }
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
      </View>
    </React.Fragment>
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
