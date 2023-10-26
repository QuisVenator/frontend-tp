import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>HomeScreen Screen</Text>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3EDFF',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
});
