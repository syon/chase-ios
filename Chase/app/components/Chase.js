import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  Text,
  Button,
  View,
  Linking,
  TabBarIOS
} from 'react-native';

import { CONSUMER_KEY, REDIRECT_URI } from 'react-native-dotenv'

import ItemList from './ItemList'

export default class Chase extends Component {
  constructor(props) {
    super(props);
    this.onSavePage = this.onSavePage.bind(this)
    this.makeItemList = this.makeItemList.bind(this)
    this.state = {
      selectedTab: 'main'
    }
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
        <TabBarIOS>
          <TabBarIOS.Item
            title="Main"
            selected={this.state.selectedTab === 'main'}
            onPress={() => { this.setState({ selectedTab: 'main' }) }}
          >
            <ItemList {...this.props} listData={listData} />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Config"
            selected={this.state.selectedTab === 'config'}
            onPress={() => { this.setState({ selectedTab: 'config' }) }}
          >
            <View style={styles.welcome}>
              <Button onPress={actions.disconnectFromPocket} title="Disconnect" />
              <Text>{ login.accessToken }</Text>
              <Text>{ login.username }</Text>
              <Button onPress={this.onSavePage} title="Add!" />
              <Button onPress={actions.loadPages} title="Load" />
            </View>
          </TabBarIOS.Item>
        </TabBarIOS>
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
