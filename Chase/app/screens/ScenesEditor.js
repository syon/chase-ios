import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import Button from 'react-native-button'
import { responsiveFontSize } from 'react-native-responsive-dimensions';

class ScenesEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      textA: this.props.scene.allScenes[0],
      textB: this.props.scene.allScenes[1],
      textC: this.props.scene.allScenes[2],
    }
    this._applyNewScenes = this._applyNewScenes.bind(this)
    this._dismiss = this._dismiss.bind(this)
  }

  _applyNewScenes(event) {
    let scenes = [this.state.textA, this.state.textB, this.state.textC]
    this.props.actions.setScenes(scenes)
    this._dismiss()
  }

  _dismiss() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    })
  }

  render() {
    const { actions } = this.props
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.textA}
          onChangeText={(text) => this.setState({ textA: text })}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />
        <TextInput
          value={this.state.textB}
          onChangeText={(text) => this.setState({ textB: text })}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />
        <TextInput
          value={this.state.textC}
          onChangeText={(text) => this.setState({ textC: text })}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />
        <Button onPress={this._applyNewScenes} style={styles.btn}>OK</Button>
        <Button onPress={this._dismiss} style={styles.btn}>Cancel</Button>
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
  btn: {
    fontSize: responsiveFontSize(3),
  }
});

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions/allActions'

export default connect(
  (state, ownProps) => ({
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(ScenesEditor)
