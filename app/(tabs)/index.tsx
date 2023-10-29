import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Button } from 'react-native-paper';
import { loadMockData, loadMockDataPersons } from '../../provider/Storage';
import { ReservationActionType, useReservationContext } from '../../provider/ReservationContext';
import { PersonActionType, usePersonContext } from '../../provider/PersonContext';

export default function TabOneScreen() {
  const {state, dispatch} = useReservationContext();
  const {state: personState, dispatch: personDispatch} = usePersonContext();

  function resetState() {
    for (let reservation of state.reservations) {
      dispatch({type: ReservationActionType.CANCEL, payload: reservation.id});
    }
    for (let person of personState.persons) {
      personDispatch({type: PersonActionType.CANCEL, payload: person.id});
    }
    const reservations = loadMockData();
    const persons = loadMockDataPersons();
    for (let res of reservations) {
      dispatch({type: ReservationActionType.ADD_INITIAL, payload: res});
    }
    for (let person of persons) {
      personDispatch({type: PersonActionType.ADD, payload: person});
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button onPress={resetState} >Cargar datos</Button>
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
