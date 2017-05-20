import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Linking,
  ActivityIndicator,
} from 'react-native'
import Button from 'react-native-button'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import SafariView from 'react-native-safari-view'
import { Navigation } from 'react-native-navigation'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      authUrl: '',
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this._handleOpenURL = this._handleOpenURL.bind(this)
    this._connectToPocket = this._connectToPocket.bind(this)
  }

  componentDidMount() {
    // After authorization, Pocket site will redirect with the custom URL Scheme.
    // Linking receives the event and pass the process to handler.
    Linking.addEventListener('url', this._handleOpenURL)
  }

  _handleOpenURL(event) {
    // No longer listen to Linking event.
    Linking.removeEventListener('url', this._handleOpenURL)
    // Pass the process to action.
    this.props.actions.doAfterRedirect(event.url)
  }

  onNavigatorEvent(event) {
    console.tron.tmp('onNavigatorEvent this:', this)
    // After this modal has disappeared, open Pocket auth page.
    switch(event.id) {
      case 'willDisappear':
        this._safari(this.state.authUrl)
        break
    }
  }

  _safari(authUrl) {
    console.tron.tmp('authUrl', authUrl)
    SafariView.isAvailable()
      .then(SafariView.show({
        url: authUrl
      }))
      .catch(err => {
        // Fallback WebView code for iOS 8 and earlier
        console.tron.error(err)
      });
  }

  async _connectToPocket() {
    this.setState({ loading: true })
    const authUrl = await this.props.actions.getPocketAuthUrl()
    this.setState({ authUrl })
    // Trigger NavigatorEvent.
    // because SafariView is not working on Modal.
    Navigation.dismissAllModals({
      animationType: 'slide-down'
    })
  }

  render() {
    const { actions } = this.props
    const indicator = this.state.loading ? <ActivityIndicator /> : null
    return (
      <View style={styles.container}>
        <Button
          onPress={this._connectToPocket}
          style={styles.btn}
          disabled={this.state.loading}
        >
          Connect to Pocket
        </Button>
        { indicator }
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
    padding: 10,
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
