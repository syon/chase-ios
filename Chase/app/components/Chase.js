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

import ItemList from './ItemList'

export default class Chase extends Component {
  constructor(props) {
    super(props);
    this._handleOpenURL = this._handleOpenURL.bind(this)
    this.onSavePage = this.onSavePage.bind(this)
    this.makeItemList = this.makeItemList.bind(this)
  }

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL(event) {
    this.props.actions.doAfterRedirect(event.url)
  }

  onSavePage() {
    const url = 'https://getpocket.com/developer/docs/authentication'
    this.props.savePage(url)
  }

  makeItemList() {
    console.log('makeItemList() -- this --', this)
    if (!this.props) { return [] }
    const { items } = this.props
    let itemList = []
    Object.keys(items.itemList).forEach(function(key) {
      const m = items.itemList[key]
      const title = m.resolved_title ? m.resolved_title : m.given_title
      const url = m.resolved_url ? m.resolved_url : m.given_url
      itemList.push({ title, url })
    })
    return itemList
  }

  render() {
    const { login, actions } = this.props;
    const listData = this.makeItemList()

    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Button onPress={actions.connectToPocket} title="Connect to Pocket" />
          <Text>{ login.accessToken }</Text>
          <Text>{ login.username }</Text>
          <Button onPress={this.onSavePage} title="Add!" />
          <Button onPress={actions.loadPages} title="Load" />
        </View>
        <ItemList {...this.props} listData={listData} />
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
  welcome: {
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
