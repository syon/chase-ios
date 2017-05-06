import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
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
        <View style={styles.form}>
          <View style={styles.formItem}>
            <Text>Scene A</Text>
            <TextInput
              value={this.state.textA}
              onChangeText={(text) => this.setState({ textA: text })}
              style={styles.input}
            />
          </View>
          <View style={styles.formItem}>
            <Text>Scene B</Text>
            <TextInput
              value={this.state.textB}
              onChangeText={(text) => this.setState({ textB: text })}
              style={styles.input}
            />
          </View>
          <View style={styles.formItem}>
            <Text>Scene C</Text>
            <TextInput
              value={this.state.textC}
              onChangeText={(text) => this.setState({ textC: text })}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.btns}>
          <Button onPress={this._applyNewScenes} style={styles.btn}>OK</Button>
          <Button onPress={this._dismiss} style={styles.btn}>Cancel</Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    paddingBottom: 150,
    backgroundColor: 'rgb(240, 239, 245)',
  },
  form: {
    flexDirection: 'row',
  },
  formItem: {
    flex: 1,
  },
  btns: {
    margin: 15,
    alignItems: 'center',
  },
  btn: {
    padding: 15,
    fontSize: responsiveFontSize(3),
  },
  input: {
    height: 40,
    padding: 5,
    fontSize: responsiveFontSize(2),
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
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
