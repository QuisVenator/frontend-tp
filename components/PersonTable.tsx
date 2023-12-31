import * as React from 'react';
import { Button, DataTable, TextInput } from 'react-native-paper';
import { Person } from '../models/Person';
import { Category, Reservation, Time } from '../models/Reservation';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from './Themed';
import { PersonActionType, usePersonContext } from '../provider/PersonContext';
import { SelectList } from 'react-native-dropdown-select-list'
import { router } from 'expo-router';
import { SnackBarActionType, useSnackBarContext } from '../provider/SnackBarContext';

const PersonTable = () => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([10, 15, 20]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[1]
  );

  const { state, dispatch } = usePersonContext();
  const [personSearch, setPersonSearch] = React.useState('');
  const [selected, setSelected] = React.useState("");

  const { dispatch: snackBarDispatch } = useSnackBarContext();

  const optionsDoctor = [
    { key: 'ALL', value: 'Doctor o Paciente' },
    { key: 'true', value: 'Doctor' },
    { key: 'false', value: 'Paciente' },
  ]

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, state.persons.length);
  const filteredPersons = state.persons.filter(res => (res.name + ' ' + res.lastName).includes(personSearch) 
                          && (res.flag_is_doctor.toString().includes(selected) 
                          || "ALL".includes(selected)) && res.id > 0)

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage, filteredPersons]);

  return (
    <React.Fragment>
      <TextInput label={'Nombre y Apellido'} value={personSearch} onChangeText={setPersonSearch} />
      <SelectList
        defaultOption={{ key:'ALL', value:'Doctor o Paciente' }}
        boxStyles={{backgroundColor: 'black'}}
        dropdownStyles={{backgroundColor: 'black'}}
        inputStyles={{color: 'white'}}
        dropdownTextStyles={{color: 'white'}}
        setSelected={(val: string) => setSelected(val)}
        search={false}
        data={optionsDoctor}
        save="key"
      />
      <ScrollView horizontal={true} style={{ marginTop: 20 }}>
        <DataTable style={{ width: 1040 }}>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title>Nombre</DataTable.Title>
            <DataTable.Title>Apellido</DataTable.Title>
            <DataTable.Title>Telefono</DataTable.Title>
            <DataTable.Title>Email</DataTable.Title>
            <DataTable.Title>Cedula</DataTable.Title>
            <DataTable.Title>Es Doctor</DataTable.Title>
            <DataTable.Title style={{justifyContent: 'center'}}>Acciones</DataTable.Title>
          </DataTable.Header>

          {filteredPersons.slice(from, to).map((res) => (
              <DataTable.Row key={res.id}>
                <DataTable.Cell>{res.id}</DataTable.Cell>
                <DataTable.Cell>{res.name}</DataTable.Cell>
                <DataTable.Cell>{res.lastName}</DataTable.Cell>
                <DataTable.Cell>{res.phone}</DataTable.Cell>
                <DataTable.Cell>{res.email}</DataTable.Cell>
                <DataTable.Cell>{res.cedula}</DataTable.Cell>
                <DataTable.Cell>{res.flag_is_doctor ? "SI" : "NO"}</DataTable.Cell>
                <DataTable.Cell style={{justifyContent: 'center'}}>
                  <View style={{ flexDirection: 'row' }}>
                    <Button onPress={() => {
                      dispatch({ type: PersonActionType.CANCEL, payload: res.id });
                      let payload = { visible: true, text: "Persona eliminada correctamente" };
                      snackBarDispatch({ type: SnackBarActionType.TOGGLE, payload });
                    }}><FontAwesome name="remove" />
                    </Button>
                    <Button onPress={() => {
                      dispatch({ type: PersonActionType.EDIT, payload: res });
                      router.push('/person/edit');
                    }}><FontAwesome name="edit" />
                    </Button>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(filteredPersons.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${filteredPersons.length ? from + 1 : 0}-${to} of ${filteredPersons.length}`}
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

export default PersonTable;