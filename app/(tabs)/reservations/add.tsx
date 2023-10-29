import * as React from "react";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { View } from "../../../components/Themed";

import { PaperSelect } from "react-native-paper-select";
import { DatePickerInput } from "react-native-paper-dates";
import { MedicalRecord } from "../../../models/MedicalRecord";
import { Person } from "../../../models/Person";
import { router } from 'expo-router';
import { Reservation, Time, availableTimes, timeToString } from "../../../models/Reservation";
import { ReservationActionType, useReservationContext } from "../../../provider/ReservationContext";
import { usePersonContext } from "../../../provider/PersonContext";

type ReservationAddProps = {
  doctorId: number;
  patientId: number;
  date: Date;
  time: Time | undefined;
};

const ReservationAdd = () => {
  const [reservationAdd, setReservationAdd] =
    React.useState({} as ReservationAddProps);
  const [doctorName, setDoctorName] = React.useState("");
  const [patientName, setPatientName] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState("");
  const [placeholderHorario, setPlaceholderHorario] = React.useState("");

  const reservationContext = useReservationContext();

  const personContext = usePersonContext();

  const addMedicalRecord = () => {
    const newRes = {
      id: reservationContext.state.reservations.length + 1,
      doctor: personContext.state.persons.find(
        (d) => d.id == reservationAdd.doctorId
      ) as Person,
      patient: personContext.state.persons.find(
        (p) => p.id == reservationAdd.patientId
      ) as Person,
      date: reservationAdd.date,
      time: reservationAdd.time,
    } as Reservation;

    reservationContext.dispatch({
      type: ReservationActionType.ADD,
      payload: newRes,
    });
    console.log(reservationContext.state.reservations)
    router.replace('/reservations');
  };

  const filterTimes = (): { _id: string, value: string }[] => {
    if (!reservationAdd.doctorId) {
      return [];
    } else if (!reservationAdd.patientId) {
      return [];
    } else if (!reservationAdd.date) {
      return [];
    } else {
      let filteredTimes = [] as { _id: string, value: string }[];
      availableTimes.reduce((_: Time, x: Time, i: number): Time => {
        if (reservationContext.state.reservations.find((res: Reservation) =>
          (
            res.date.getFullYear() == reservationAdd.date.getFullYear() &&
            res.date.getMonth() == reservationAdd.date.getMonth() &&
            res.date.getDay() == reservationAdd.date.getDay() &&
            res.doctor.id == reservationAdd.doctorId &&
            res.time.hours == x.hours
          ) || (
            res.date.getFullYear() == reservationAdd.date.getFullYear() &&
            res.date.getMonth() == reservationAdd.date.getMonth() &&
            res.date.getDay() == reservationAdd.date.getDay() &&
            res.patient.id == reservationAdd.patientId &&
            res.time.hours == x.hours
          )
        ) === undefined) {
          filteredTimes.push({ _id: i.toString(), value: timeToString(x) });
        }
        return x;
      });
      if (filteredTimes.length == 0) {
        return [];
      }
      return filteredTimes;
    }
  }

  React.useEffect(() => {
    if (!reservationAdd.doctorId) {
      setPlaceholderHorario("Seleccionar Doctor primero");
    } else if (!reservationAdd.patientId) {
      setPlaceholderHorario("Seleccionar Paciente primero");
    } else if (!reservationAdd.date) {
      setPlaceholderHorario("Seleccionar Fecha primero");
    } else {
      setPlaceholderHorario("Seleccionar Horario");
    }
  }, [reservationAdd.doctorId, reservationAdd.patientId, reservationAdd.date]);

  return (
    <React.Fragment>
      <View style={{ width: '100%', height: 56 }}>
        <PaperSelect
          label="Seleccione el doctor"
          value={doctorName}
          onSelection={(item: any) => {
            if (item.selectedList.length == 0) {
              setReservationAdd({
                ...reservationAdd,
                doctorId: 0,
              });
              setDoctorName("");
              return;
            }
            setDoctorName(item.selectedList[0].value);
            setReservationAdd({
              ...reservationAdd,
              doctorId: item.selectedList[0]._id,
            });
          }}
          arrayList={personContext.state.persons.filter((d) => d.flag_is_doctor).map((d) => ({
            _id: d.id.toString(),
            value: `${d.name} ${d.lastName}`,
          }))}
          selectedArrayList={[]}
          multiEnable={false}
        />
      </View>
      <View style={{ width: '100%', height: 56 }}>
        <PaperSelect
          label="Seleccione el paciente"
          value={patientName}
          onSelection={(item: any) => {
            if (item.selectedList.length == 0) {
              setReservationAdd({
                ...reservationAdd,
                patientId: 0,
              });
              setPatientName("");
              return;
            }
            setPatientName(item.selectedList[0].value);
            setReservationAdd({
              ...reservationAdd,
              patientId: item.selectedList[0]._id,
            });
          }}
          arrayList={personContext.state.persons.filter((d) => !d.flag_is_doctor).map((d) => ({
            _id: d.id.toString(),
            value: `${d.name} ${d.lastName}`,
          }))}
          selectedArrayList={[]}
          multiEnable={false}
        />
      </View>
      <View style={{ width: '100%', height: 56 }}>
        <DatePickerInput
          label="Fecha"
          onChange={(date) =>
            setReservationAdd({ ...reservationAdd, date: date as Date })
          }
          inputMode="start"
          locale="es"
          value={reservationAdd.date}
          presentationStyle="pageSheet"
        />
      </View>
      <PaperSelect
        label={placeholderHorario}
        value={selectedTime}
        onSelection={(value: any) => {
          if (value.selectedList.length == 0) {
            setSelectedTime("");
            setReservationAdd({
              ...reservationAdd,
              time: undefined,
            });
            return;
          }
          setSelectedTime(value.selectedList[0].value);
          setReservationAdd({
            ...reservationAdd,
            time: availableTimes[parseInt(value.selectedList[0]._id)],
          });
        }}
        arrayList={filterTimes()}
        selectedArrayList={[]}
        multiEnable={false}
      />
      <Button
        icon="plus"
        mode="contained"
        onPress={addMedicalRecord}
        children="Guardar"
      />
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
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
});

export default ReservationAdd;
