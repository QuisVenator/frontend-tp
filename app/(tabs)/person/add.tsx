import * as React from "react";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { View } from "../../../components/Themed";

import { Person } from "../../../models/Person";
import { PersonActionType, usePersonContext } from "../../../provider/PersonContext";
import { router } from 'expo-router';
import { SelectList } from 'react-native-dropdown-select-list'
import { SnackBarActionType, useSnackBarContext } from "../../../provider/SnackBarContext";
import { ScrollView } from "react-native-gesture-handler";

type PersonAdd = {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  cedula: string;
  flag_is_doctor: boolean;
}

const PersonAdd = () => {
  const [personAdd, setPersonAdd] = React.useState<PersonAdd>({} as PersonAdd);
  const personContext = usePersonContext();

  const [selected, setSelected] = React.useState(false);

  const optionsDoctor = [
    { key: true, value: 'Doctor' },
    { key: false, value: 'Paciente' },
  ]

  const { dispatch: snackBarDispatch } = useSnackBarContext();

  const addPerson = () => {
    const { name, lastName, phone, email, cedula, flag_is_doctor } = personAdd;
    const id = personContext.state.persons.length + 1;
    const person: Person = {
      id,
      name,
      lastName,
      phone,
      email,
      cedula,
      flag_is_doctor
    };
    personContext.dispatch({
      type: PersonActionType.ADD,
      payload: person,
    });
    router.push('/person');

    let payload = { visible: true, text: "Persona agregada correctamente" };
    snackBarDispatch({ type: SnackBarActionType.TOGGLE, payload });
  }
  return (
    <SafeAreaProvider>
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            label="Nombre"
            value={personAdd.name}
            onChangeText={(text) =>
              setPersonAdd({ ...personAdd, name: text })
            }
          />
          <TextInput
            label="Apellido"
            value={personAdd.lastName}
            onChangeText={(text) =>
              setPersonAdd({ ...personAdd, lastName: text })
            }
          />
          <TextInput
            label="Telefono"
            value={personAdd.phone}
            keyboardType="numeric"
            onChangeText={(text) =>
              setPersonAdd({ ...personAdd, phone: text })
            }
          />
          <TextInput
            label="Email"
            value={personAdd.email}
            onChangeText={(text) =>
              setPersonAdd({ ...personAdd, email: text })
            }
          />
          <TextInput
            label="Cedula"
            value={personAdd.cedula}
            onChangeText={(text) =>
              setPersonAdd({ ...personAdd, cedula: text })
            }
          />
          <SelectList
            boxStyles={{ backgroundColor: 'black' }}
            dropdownStyles={{ backgroundColor: 'black' }}
            inputStyles={{ color: 'white' }}
            dropdownTextStyles={{ color: 'white' }}
            setSelected={(val: boolean) => setSelected(val)}
            data={optionsDoctor}
            save="key"
            search={false}
            defaultOption={{ key: false, value: 'Paciente' }}
            onSelect={() => setPersonAdd({ ...personAdd, flag_is_doctor: selected.valueOf() })}
          />
        </View>
      </ScrollView>
      <Button
        icon="plus"
        mode="contained"
        onPress={addPerson}
        children="Guardar"
      />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 4,
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

export default PersonAdd;