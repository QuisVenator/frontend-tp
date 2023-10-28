import * as React from 'react';
import { Button, DataTable, TextInput } from 'react-native-paper';
import { Person } from '../models/Person';
import { Category, Reservation, Time } from '../models/Reservation';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from './Themed';
import { ReservationActionType, useReservationContext } from '../provider/ReservationContext';
import { DatePickerInput } from "react-native-paper-dates";

const ReservationTable = () => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[1]
  );

  const { state, dispatch } = useReservationContext();
  const [doctorSearch, setDoctorSearch] = React.useState('');
  const [patientSearch, setPatientSearch] = React.useState('');
  let [dateFrom, setDateFrom] = React.useState(today());
  let [dateTo, setDateTo] = React.useState(today());

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, state.reservations.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <React.Fragment>
      <TextInput style={{ width: '100%' }} label={'Doctor'} value={doctorSearch} onChangeText={setDoctorSearch} />
      <TextInput style={{ width: '100%' }} label={'Paciente'} value={patientSearch} onChangeText={setPatientSearch} />
      <View style={{ width: '100%', height: 56 }}>
        <DatePickerInput
          label="Desde"
          onChange={(date) =>
            setDateFrom(date as Date)
          }
          inputMode='start'
          locale="es"
          value={dateFrom}
          style={{ padding: 0 }}
          presentationStyle="pageSheet"
        />
      </View>
      <View style={{ width: '100%', height: 56 }}>
        <DatePickerInput
          label="Hasta"
          onChange={(date) =>
            setDateTo(date as Date)
          }
          inputMode='start'
          locale="es"
          value={dateTo}
          presentationStyle="pageSheet"
        />
      </View>
      <ScrollView horizontal={true} style={{marginTop: 20}}>
        <DataTable style={{ width: 1040 }}>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title>Doctor</DataTable.Title>
            <DataTable.Title>Paciente</DataTable.Title>
            <DataTable.Title>Fecha</DataTable.Title>
            <DataTable.Title>Horario</DataTable.Title>
            <DataTable.Title>Acciones</DataTable.Title>
          </DataTable.Header>

          {state.reservations.slice(from, to).filter(res => (res.doctor.name+' '+res.doctor.lastName).includes(doctorSearch) && 
            (res.patient.name+' '+res.patient.lastName).includes(patientSearch) &&
            res.date >= dateFrom && res.date <= dateTo &&
            res.id > 0).map((res) => (
            <DataTable.Row key={res.id}>
              <DataTable.Cell>{res.id}</DataTable.Cell>
              <DataTable.Cell>{res.doctor.name + ' ' + res.doctor.lastName}</DataTable.Cell>
              <DataTable.Cell>{res.patient.name + ' ' + res.doctor.lastName}</DataTable.Cell>
              <DataTable.Cell>{res.date.getFullYear()+'-'+res.date.getMonth()+'-'+res.date.getDay()}</DataTable.Cell>
              <DataTable.Cell>{res.time.hours}:{res.time.minutes}</DataTable.Cell>
              <DataTable.Cell>
                <Button onPress={() => dispatch({ type: ReservationActionType.CANCEL, payload: res.id })}><FontAwesome
                  name="remove"
                /></Button>
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(state.reservations.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${state.reservations.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={'Rows per page'}
          />
        </DataTable>
      </ScrollView>
    </React.Fragment>
  );
};


function today() {
  let date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export default ReservationTable;