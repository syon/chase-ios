import React, { Component } from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'

class ConfigTab extends Component {
  constructor(props) {
    super(props);
    this.onSavePage = this.onSavePage.bind(this)
  }

  onSavePage() {
    const url = 'https://getpocket.com/developer/docs/authentication'
    this.props.actions.savePage(url)
  }

  render() {
    const { login, actions } = this.props;
    return (
      <View style={styles.welcome}>
        <Button onPress={actions.disconnectFromPocket} title="Disconnect" />
        <Text>{ login.accessToken }</Text>
        <Text>{ login.username }</Text>
        <Button onPress={this.onSavePage} title="Add!" />
        <Button onPress={actions.getMainTabItemList} title="API Test - getAllUntaggedItems" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    margin: 10,
  },
})

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions/allActions'

export default connect(
  (state, ownProps) => ({
    login: state.login,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(ConfigTab)
