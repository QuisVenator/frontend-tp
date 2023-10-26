import * as React from 'react';
import { Button, DataTable, TextInput } from 'react-native-paper';
import { Person } from '../models/Person';
import { Category, Reservation, Time } from '../models/Reservation';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from './Themed';
import { ReservationActionType, useReservationContext } from '../provider/ReservationContext';

const ReservationTable = () => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[1]
  );

  const {state, dispatch} = useReservationContext();
  const [searchText, setSearchText] = React.useState('');

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, state.reservations.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  console.log(state.reservations)

  return (
    <React.Fragment>
      <TextInput label={'Buscar'} value={searchText} onChangeText={setSearchText} />
      <ScrollView horizontal={true}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title>Doctor</DataTable.Title>
            <DataTable.Title>Paciente</DataTable.Title>
            <DataTable.Title>Fecha</DataTable.Title>
            <DataTable.Title>Horario</DataTable.Title>
            <DataTable.Title>Acciones</DataTable.Title>
          </DataTable.Header>

          {state.reservations.slice(from, to).filter(res => (res.doctor.name + res.doctor.lastName).includes(searchText)).map((res) => (
            <DataTable.Row key={res.id}>
              <DataTable.Cell>{res.id}</DataTable.Cell>
              <DataTable.Cell>{res.doctor.name + res.doctor.lastName}</DataTable.Cell>
              <DataTable.Cell>{res.patient.name + res.doctor.lastName}</DataTable.Cell>
              <DataTable.Cell>{""}</DataTable.Cell>
              <DataTable.Cell>{res.time.hours}:{res.time.minutes}</DataTable.Cell>
              <DataTable.Cell>
                <Button onPress={() => console.log("canceled")}><FontAwesome
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

export default ReservationTable;