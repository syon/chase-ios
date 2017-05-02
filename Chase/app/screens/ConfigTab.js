import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Button from 'react-native-button'
import { responsiveFontSize } from 'react-native-responsive-dimensions';

class ConfigTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { login, actions } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.username}>{ login.username }</Text>
          <Button
            onPress={actions.disconnectFromPocket}
            style={styles.btn}
          >
            Disconnect
          </Button>
        </View>
        <View>
          <Button onPress={actions.clearCatalogCache} style={styles.btn}>Clear Cache</Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  username: {
    fontSize: responsiveFontSize(2),
    margin: 20,
  },
  btn: {
    padding: 15,
    fontSize: responsiveFontSize(2.5),
  }
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
