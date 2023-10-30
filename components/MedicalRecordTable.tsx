import * as React from "react";
import { DataTable, TextInput, Button } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useMedicalRecordContext } from "../provider/MedicalRecordContext";

const MedicalRecordTable = () => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[1]
  );

  const { state } = useMedicalRecordContext();
  const [filteredData, setFilteredData] = React.useState(state.medicalRecords);
  const [tableFilters, setTableFilters] = React.useState({
    doctor: "",
    patient: "",
    category: "",
  });

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, state.medicalRecords.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  React.useEffect(() => {
    filterTable();
  }, [tableFilters]);

  // Cuando se añade una nueva ficha clínica, se debe actualizar la tabla y limpiar los filtros
  React.useEffect(() => {
    setFilteredData(state.medicalRecords);
    setTableFilters({ doctor: "", patient: "", category: "" });
  }, [state.medicalRecords]);

  const filterTable = () => {
    const { doctor, patient, category } = tableFilters;
    let filteredData = state.medicalRecords;
    if (doctor)
      filteredData = filteredData.filter((res) =>
        (res.doctor.name + res.doctor.lastName).includes(doctor)
      );
    if (patient)
      filteredData = filteredData.filter((res) =>
        (res.patient.name + res.patient.lastName).includes(patient)
      );

    if (category)
      filteredData = filteredData.filter((res) =>
        res.category.description.includes(category)
      );
    setFilteredData(filteredData);
  };

  return (
    <React.Fragment>
      <TextInput
        label="Doctor"
        onChangeText={(doctor) => setTableFilters({ ...tableFilters, doctor })}
      />
      <TextInput
        label="Paciente"
        onChangeText={(patient) =>
          setTableFilters({ ...tableFilters, patient })
        }
      />
      <TextInput
        label="Categoria"
        onChangeText={(category) =>
          setTableFilters({ ...tableFilters, category })
        }
      />

      <ScrollView horizontal={true}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title>Doctor</DataTable.Title>
            <DataTable.Title>Paciente</DataTable.Title>
            <DataTable.Title>Fecha</DataTable.Title>
            <DataTable.Title>Categoría</DataTable.Title>
            <DataTable.Title>Motivo</DataTable.Title>
            <DataTable.Title>Diágnostico</DataTable.Title>
          </DataTable.Header>

          {filteredData.slice(from, to).map((res) => (
            <DataTable.Row key={res.id}>
              <DataTable.Cell>{res.id}</DataTable.Cell>
              <DataTable.Cell>
                {`${res.doctor.name} ${res.doctor.lastName}`}
              </DataTable.Cell>
              <DataTable.Cell>
                {`${res.patient.name} ${res.patient.lastName}`}
              </DataTable.Cell>
              <DataTable.Cell>{res.category.description}</DataTable.Cell>
              <DataTable.Cell>{res.diagnostic}</DataTable.Cell>
              <DataTable.Cell>{res.reason}</DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(
              state.medicalRecords.length / itemsPerPage
            )}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${state.medicalRecords.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
      </ScrollView>
    </React.Fragment>
  );
};

export default MedicalRecordTable;
