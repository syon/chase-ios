import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Linking,
} from 'react-native'
import Button from 'react-native-button'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

class Login extends Component {
  constructor(props) {
    super(props)
    this._handleOpenURL = this._handleOpenURL.bind(this)
  }

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL)
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL)
  }

  _handleOpenURL(event) {
    this.props.actions.doAfterRedirect(event.url)
  }

  render() {
    const { actions } = this.props
    return (
      <View style={styles.container}>
        <Button
          onPress={actions.connectToPocket}
          style={styles.btn}
        >
          Connect to Pocket
        </Button>
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
  },
})

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions/allActions'

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch),
  })
)(Login)
