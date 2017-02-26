import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  Text,
  Button,
  View,
  Linking
} from 'react-native';

import { CONSUMER_KEY, REDIRECT_URI } from 'react-native-dotenv'

export default class Chase extends Component {
  constructor(props) {
    super(props);
    this._handleOpenURL = this._handleOpenURL.bind(this)
    this.onSavePage = this.onSavePage.bind(this)
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
    console.log('handleOpenURL', this);
    if (event.url.match(/authorizationFinished/)) {
      // Alert.alert("Authed.")
      this.props.getAccessToken()
    }
  }

  onSavePage() {
    const url = 'https://getpocket.com/developer/docs/authentication'
    this.props.savePage(url)
  }

  render() {
    const { pocket, getReqToken, openAuthPage, loadPages } = this.props;

    return (
      <View style={styles.container}>
        <Button onPress={getReqToken} title="Connect to Pocket" />
        <Button onPress={openAuthPage} title="openAuthPage" />
        <Text>{ pocket.requestToken }</Text>
        <Text>{ pocket.accessToken }</Text>
        <Text>{ pocket.username }</Text>
        <Text>{ pocket.authed ? '接続済み' : '未接続' }</Text>
        <Button onPress={this.onSavePage} title="Add!" />
        <Button onPress={loadPages} title="Load" />
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
