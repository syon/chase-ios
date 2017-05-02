import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Button from 'react-native-button'
import { responsiveFontSize } from 'react-native-responsive-dimensions';

class ConfigTab extends Component {
  constructor(props) {
    super(props)
    this._onSelectSceneEdit = this._onSelectSceneEdit.bind(this)
  }

  _onSelectSceneEdit() {
    return
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
        <View style={styles.selectSceneBox}>
          <View style={styles.selectScene}>
            <Button onPress={this._onSelectSceneEdit} style={styles.sceneBtn}>自宅</Button>
            <Button onPress={this._onSelectSceneEdit} style={styles.sceneBtn}>職場</Button>
            <Button onPress={this._onSelectSceneEdit} style={styles.sceneBtn}>暇つぶし</Button>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: 50,
    backgroundColor: 'rgb(240, 239, 245)',
  },
  username: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    margin: 20,
  },
  btn: {
    padding: 15,
    fontSize: responsiveFontSize(2.5),
  },
  selectSceneBox: {
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 10,
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1,
    shadowOpacity: 0.2,
  },
  selectScene: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5,
  },
  sceneBtn: {
    fontSize: responsiveFontSize(2),
    padding: 10,
    overflow: 'hidden',
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
