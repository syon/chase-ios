import React, { Component } from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'

class TagsTab extends Component {
  render() {
    const { login, actions } = this.props;
    return (
      <View style={styles.welcome}>
        <Button onPress={actions.testPocketAdapter} title="API Test" />
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
)(TagsTab)
