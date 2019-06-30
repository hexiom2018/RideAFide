import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Navigation from './navigation';
// console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <>
        <StatusBar barStyle="default" />
        <Navigation />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
