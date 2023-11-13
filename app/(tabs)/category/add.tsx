import * as React from "react";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { View } from "../../../components/Themed";

import { Category } from "../../../models/Category";
import { CategoryActionType, useCategoryContext } from "../../../provider/CategoryContext";
import { router } from 'expo-router';
import { SnackBarActionType, useSnackBarContext } from "../../../provider/SnackBarContext";

type CategoryAdd={
    description:string;
}

const CategoryAdd = () => {
    const [categoryAdd, setCategoryAdd] = React.useState <CategoryAdd>({} as CategoryAdd);
    const categoryContext = useCategoryContext();

    const { dispatch: snackBarDispatch } = useSnackBarContext();

    const addCategory = () => {
        const {description} = categoryAdd;
        const id = categoryContext.state.categories.length + 1;
        const category: Category = {
            id,
            description
        };
        categoryContext.dispatch({
            type: CategoryActionType.ADD,
            payload: category,
        });
        router.back();

        let payload = { visible: true, text: "Categoría agregada correctamente" };
        snackBarDispatch({ type: SnackBarActionType.TOGGLE, payload });
    }
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <TextInput
                    label="Descripcion"
                    value={categoryAdd.description}
                    onChangeText={(text) =>
                        setCategoryAdd({ ...categoryAdd, description: text })
                    }
                />
                <Button
                    icon="plus"
                    mode="contained"
                    onPress={addCategory}
                    children="Guardar"
                />
            </View>
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

  export default CategoryAdd;