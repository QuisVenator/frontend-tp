import { StyleSheet } from 'react-native';

import ReservationTable from '../../../components/ReservationTable';
import { Text, View } from '../../../components/Themed';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservas</Text>
      <Link href="/reservations/add" asChild>
        <Button icon="plus">Agregar</Button>
      </Link>
      <ReservationTable />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
