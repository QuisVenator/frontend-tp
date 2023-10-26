import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Button } from 'react-native-paper';
import { loadMockData } from '../../provider/Storage';
import { ReservationActionType, useReservationContext } from '../../provider/ReservationContext';

export default function TabOneScreen() {
  const {state, dispatch} = useReservationContext();
  
  function resetState() {
    for (let reservation of state.reservations) {
      dispatch({type: ReservationActionType.CANCEL, payload: reservation.id});
    }
    const reservations = loadMockData();
    for (let res of reservations) {
      dispatch({type: ReservationActionType.ADD, payload: res});
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
