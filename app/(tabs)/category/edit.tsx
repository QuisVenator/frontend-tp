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
import { CategoryActionType, useCategoryContext } from "../../../provider/CategoryContext";

const CategoryAdd = () => {
  const categoryContext = useCategoryContext();
  const { dispatch: snackBarDispatch } = useSnackBarContext();

  const editPerson = () => {
    categoryContext.dispatch({
      type: CategoryActionType.UPDATE,
      payload: categoryContext.state.edit,
    });
    router.push('/category');

    let payload = { visible: true, text: "Categoria editada correctamente" };
    snackBarDispatch({ type: SnackBarActionType.TOGGLE, payload });
  }
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <TextInput
          label="Descripcion"
          value={categoryContext.state.edit.description}
          onChangeText={(text) =>
            categoryContext.dispatch({ type: CategoryActionType.EDIT, payload: { ...categoryContext.state.edit, description: text } })
          }
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

export default CategoryAdd;