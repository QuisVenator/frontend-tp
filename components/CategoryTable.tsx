import * as React from 'react';
import { Button, DataTable, TextInput } from 'react-native-paper';
import { Category } from '../models/Category';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from './Themed';
import { CategoryActionType, useCategoryContext } from '../provider/CategoryContext';

const CategoryTable = () => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[1]
  );

  const { state, dispatch } = useCategoryContext();

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, state.categories.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <React.Fragment>
      <ScrollView horizontal={true} style={{ marginTop: 20 }}>
        <DataTable style={{ width: 1040 }}>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title>Descripcion</DataTable.Title>
            <DataTable.Title>Acciones</DataTable.Title>
          </DataTable.Header>

          {state.categories.slice(from, to).map((res) => (
              <DataTable.Row key={res.id}>
                <DataTable.Cell>{res.id}</DataTable.Cell>
                <DataTable.Cell>{res.description}</DataTable.Cell>
                <DataTable.Cell>
                  <Button onPress={() => dispatch({ type: CategoryActionType.CANCEL, payload: res.id })}><FontAwesome
                    name="remove"
                  /></Button>
                </DataTable.Cell>
              </DataTable.Row>
            ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(state.categories.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${state.categories.length}`}
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

export default CategoryTable;