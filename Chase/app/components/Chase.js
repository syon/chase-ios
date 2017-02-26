import React, { Component } from 'react';
import {
  AppRegistry,
  NativeModules,
  StyleSheet,
  Text,
  Alert,
  Button,
  View,
  Linking
} from 'react-native';

import Weey from './Weey.js'
import { checkPocketApiAuth } from '../PocketAPI';

import { CONSUMER_KEY, REDIRECT_URI } from 'react-native-dotenv'
console.log('API_KEY, ANOTHER_CONFIG', CONSUMER_KEY, REDIRECT_URI)

async function afterAuthed() {
  Alert.alert("Authed.")
  // store.authed = true
  const result = await checkPocketApiAuth(CONSUMER_KEY, REDIRECT_URI, token)
  if (result) {
    // store.accessToken = result.access_token
    // store.username = result.username
    Alert.alert(result.username)
  }
}

export default class Chase extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL(event) {
    console.log('===========================');
    console.log(event.url);
    console.log('===========================');
    if (event.url.match(/authorizationFinished/)) {
      afterAuthed()
    }
  }

  updateRequestToken(rt) {
    console.log('updateRequestToken', rt)
    this.setState({ requestToken: rt })
  }

  render() {
    const { goahead } = this.props;

    return (
      <View style={styles.container}>
        <Weey {...this.state} />
        <Button
          onPress={goahead}
          title="GO_AHEAD"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
