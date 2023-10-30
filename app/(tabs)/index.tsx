import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Button, Snackbar } from 'react-native-paper';
import { loadMockData, loadMockDataPersons, loadMockDataCategories } from '../../provider/Storage';
import { ReservationActionType, useReservationContext } from '../../provider/ReservationContext';
import { PersonActionType, usePersonContext } from '../../provider/PersonContext';
import { CategoryActionType, useCategoryContext } from '../../provider/CategoryContext';
import React from 'react';
import { SnackBarActionType, useSnackBarContext } from '../../provider/SnackBarContext';

export default function TabOneScreen() {
  const {state, dispatch} = useReservationContext();
  const {state: personState, dispatch: personDispatch} = usePersonContext();
  const {state: categoryState, dispatch: categoryDispatch} = useCategoryContext();
  const {dispatch: snackBarDispatch} = useSnackBarContext();



  function resetState() {
    for (let reservation of state.reservations) {
      dispatch({type: ReservationActionType.CANCEL, payload: reservation.id});
    }
    for (let person of personState.persons) {
      personDispatch({type: PersonActionType.CANCEL, payload: person.id});
    }
    for (let category of categoryState.categories) {
      categoryDispatch({type: CategoryActionType.CANCEL, payload: category.id});
    }
    const reservations = loadMockData();
    const persons = loadMockDataPersons();
    const categories = loadMockDataCategories();
    for (let res of reservations) {
      dispatch({type: ReservationActionType.ADD_INITIAL, payload: res});
    }
    for (let person of persons) {
      personDispatch({type: PersonActionType.ADD_INITIAL, payload: person});
    }
    for (let category of categories) {
      categoryDispatch({type: CategoryActionType.ADD_INITIAL, payload: category});
    }
    let payload = { visible: true, text: "Datos cargados correctamente" };
    snackBarDispatch({ type: SnackBarActionType.TOGGLE, payload });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button onPress={resetState}>Cargar datos</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
