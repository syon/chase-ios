import React, { Component } from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'

export default class extends Component {
  constructor(props) {
    super(props);
    this.onSavePage = this.onSavePage.bind(this)
  }

  onSavePage() {
    const url = 'https://getpocket.com/developer/docs/authentication'
    this.props.savePage(url)
  }

  render() {
    const { login, actions } = this.props;
    return (
      <View style={styles.welcome}>
        <Button onPress={actions.disconnectFromPocket} title="Disconnect" />
        <Text>{ login.accessToken }</Text>
        <Text>{ login.username }</Text>
        <Button onPress={this.onSavePage} title="Add!" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    margin: 10,
  },
})
