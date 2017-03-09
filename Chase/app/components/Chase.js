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
import Icon from 'react-native-vector-icons/Ionicons'
import { CONSUMER_KEY, REDIRECT_URI } from 'react-native-dotenv'

import MainTab from './MainTab'
import ConfigTab from './ConfigTab'

export default class Chase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'main'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TabBarIOS>
          <Icon.TabBarItem
            title="マイリスト"
            iconName="ios-paper-outline"
            selectedIconName="ios-paper"
            selected={this.state.selectedTab === 'main'}
            onPress={() => { this.setState({ selectedTab: 'main' }) }}
          >
            <MainTab {...this.props} />
          </Icon.TabBarItem>
          <Icon.TabBarItem
            title="設定"
            iconName="ios-options-outline"
            selectedIconName="ios-options"
            selected={this.state.selectedTab === 'config'}
            onPress={() => { this.setState({ selectedTab: 'config' }) }}
          >
            <ConfigTab {...this.props} />
          </Icon.TabBarItem>
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
    backgroundColor: '#fff',
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
