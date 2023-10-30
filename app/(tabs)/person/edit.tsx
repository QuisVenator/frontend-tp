import * as React from "react";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { View } from "../../../components/Themed";

import { Person } from "../../../models/Person";
import { PersonActionType, usePersonContext } from "../../../provider/PersonContext";
import { router } from 'expo-router';
import { SelectList } from 'react-native-dropdown-select-list'

const PersonAdd = () => {
  const personContext = usePersonContext();

  const optionsDoctor = [
    { key: true, value: 'Doctor' },
    { key: false, value: 'Paciente' },
  ]

  const editPerson = () => {
    personContext.dispatch({
      type: PersonActionType.UPDATE,
      payload: personContext.state.edit,
    });
    router.push('/person');
  }
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <TextInput
          label="Nombre"
          value={personContext.state.edit.name}
          onChangeText={(text) =>
            personContext.dispatch({ type: PersonActionType.EDIT, payload: { ...personContext.state.edit, name: text } })
          }
        />
        <TextInput
          label="Apellido"
          value={personContext.state.edit.lastName}
          onChangeText={(text) =>
            personContext.dispatch({ type: PersonActionType.EDIT, payload: { ...personContext.state.edit, lastName: text } })
          }
        />
        <TextInput
          label="Telefono"
          value={personContext.state.edit.phone}
          keyboardType="numeric"
          onChangeText={(text) =>
            personContext.dispatch({ type: PersonActionType.EDIT, payload: { ...personContext.state.edit, phone: text } })
          }
        />
        <TextInput
          label="Email"
          value={personContext.state.edit.email}
          onChangeText={(text) =>
            personContext.dispatch({ type: PersonActionType.EDIT, payload: { ...personContext.state.edit, email: text } })
          }
        />
        <TextInput
          label="Cedula"
          value={personContext.state.edit.cedula}
          onChangeText={(text) =>
            personContext.dispatch({ type: PersonActionType.EDIT, payload: { ...personContext.state.edit, cedula: text } })
          }
        />
        <SelectList
          boxStyles={{ backgroundColor: 'black' }}
          dropdownStyles={{ backgroundColor: 'black' }}
          inputStyles={{ color: 'white' }}
          dropdownTextStyles={{ color: 'white' }}
          defaultOption={{ key: personContext.state.edit.flag_is_doctor, value: personContext.state.edit.flag_is_doctor ? 'Doctor' : 'Paciente' }}
          setSelected={(val: boolean) => personContext.dispatch({ type: PersonActionType.EDIT, payload: { ...personContext.state.edit, flag_is_doctor: val } })}
          data={optionsDoctor}
          save="key"
          search={false}
        />
      </View>
      <Button
        icon="pencil"
        mode="contained"
        onPress={editPerson}
        children="Guardar"
      />
    </SafeAreaProvider>
  )
}

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

export default PersonAdd;