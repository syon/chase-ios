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

import MainTab from './MainTab'
import ConfigTab from './ConfigTab'

export default class Chase extends Component {
  constructor(props) {
    super(props);
    this.makeItemList = this.makeItemList.bind(this)
    this.state = {
      selectedTab: 'main'
    }
  }

  makeItemList() {
    if (!this.props) { return [] }
    const { items } = this.props
    let itemList = []
    Object.keys(items.itemList).forEach(function(key) {
      const m = items.itemList[key]
      const title = m.resolved_title ? m.resolved_title : m.given_title
      const url = m.resolved_url ? m.resolved_url : m.given_url
      itemList.push({ title, url })
    })
    console.info('makeItemList()', itemList)
    return itemList
  }

  render() {
    const listData = this.makeItemList()

    return (
      <View style={styles.container}>
        <TabBarIOS>
          <TabBarIOS.Item
            title="Main"
            selected={this.state.selectedTab === 'main'}
            onPress={() => { this.setState({ selectedTab: 'main' }) }}
          >
            <MainTab {...this.props} listData={listData} />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Config"
            selected={this.state.selectedTab === 'config'}
            onPress={() => { this.setState({ selectedTab: 'config' }) }}
          >
            <ConfigTab {...this.props} />
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
})
