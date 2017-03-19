import React, {Component} from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
});
