import React, { Component } from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'

class ConfigTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { login, actions } = this.props;
    return (
      <View style={styles.container}>
        <Text>{ login.username }</Text>
        <Button onPress={actions.disconnectFromPocket} title="Disconnect" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
})

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions/allActions'

export default connect(
  (state, ownProps) => ({
    login: state.login,
    allStates: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(ConfigTab)
