import * as React from 'react';
import { Button, DataTable, TextInput } from 'react-native-paper';
import { Person } from '../src/models/Person';
import { Category, Time } from '../src/models/Reservation';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from './Themed';

const ReservationTable = () => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  let person1 = new Person(1, 'John', 'Doe', '595123456789', 'asdf@example.com', '123456', false);
  let person2 = new Person(2, 'Mary', 'Doe', '595321456789', 'qwer@example.com', '123457', true);
  let person3 = new Person(3, 'Fernando', 'Smith', '595321456789', 'fer@example.com', '123456', false);
  let person4 = new Person(4, 'Doctor', 'Gonzalez', '595321456789', 'doctor@example.com', '123456', true);
  let category1 = new Category(1, 'Category 1');
  let category2 = new Category(2, 'Category 2');

  const [reservations] = React.useState([
    {
      patient: person1,
      doctor: person2,
      date: new Date("2023-09-01 00:00:00"),
      time: { hours: 10, minutes: 0 } as Time,
      id: 1,
    },
    {
      patient: person1,
      doctor: person2,
      date: new Date("2023-09-01 00:00:00"),
      time: { hours: 11, minutes: 0 } as Time,
      id: 2,
    },
    {
      patient: person3,
      doctor: person4,
      date: new Date("2023-09-02 00:00:00"),
      time: { hours: 10, minutes: 0 },
      id: 3,
    },
  ]
  );
  const [searchText, setSearchText] = React.useState('');

  const allReservations = reservations;

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, reservations.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

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

          {reservations.slice(from, to).filter(res => res.doctor.getFullName().includes(searchText)).map((res) => (
            <DataTable.Row key={res.id}>
              <DataTable.Cell>{res.id}</DataTable.Cell>
              <DataTable.Cell>{res.doctor.getFullName()}</DataTable.Cell>
              <DataTable.Cell>{res.patient.getFullName()}</DataTable.Cell>
              <DataTable.Cell>{res.date.toLocaleDateString()}</DataTable.Cell>
              <DataTable.Cell>{res.time.hours}:{res.time.minutes}</DataTable.Cell>
              <DataTable.Cell>
                <Button onPress={() => { }}><FontAwesome
                  name="remove"
                /> Cancelar</Button>
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(reservations.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${reservations.length}`}
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