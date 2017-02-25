import React, { Component } from 'react';
import { WebView, Linking } from 'react-native';
import {
  Alert,
  Button,
  Text,
  View,
} from 'react-native'
import { getRequestToken, checkPocketApiAuth, add } from '../PocketAPI';

const CONSUMER_KEY = '63654-23d5c830be3ff2d8132e0a1c'
const REDIRECT_URI = 'pocketapp63654://authorizationFinished'

let user = {
  access_token: "569b3166-3d75-e345-f1a3-a67eb7",
  username: "rilukkuma@gmail.com"
}

export default class Weey extends Component {
  constructor(props) {
    super(props);
    console.log('Weey Props is', props)
    this.state = {
      requestToken: null,
      accessToken: null,
      username: null,
    };
  }

  onButtonPress = async () => {
    const token = await getRequestToken(CONSUMER_KEY, REDIRECT_URI)
    console.log('getRequestToken RESULT', token)
    this.setState({ requestToken: token })
    const result = await checkPocketApiAuth(CONSUMER_KEY, REDIRECT_URI, token)
    if (result) {
      this.setState({ accessToken: result.access_token, username: result.username })
    }
    console.log(this.props.updateRequestToken)
    this.props.updateRequestToken(token)
  }

  onAdd() {
    add(CONSUMER_KEY, user.access_token, 'http://google.co.jp')
  }

  render() {
    return (
      <View>
        <Button
          onPress={this.onButtonPress}
          title="Connect to Pocket"
          color="#841584"
          accessibilityLabel="Connect to Pocket"
        />
        <Text>{ this.state.requestToken }</Text>
        <Text>{ this.state.accessToken }</Text>
        <Text>{ this.state.username }</Text>
        <Text>{this.props.authed ? '接続済み' : '未接続'}</Text>
        <Button
          onPress={this.onAdd}
          title="Add!"
        />
      </View>
    );
  }
}
