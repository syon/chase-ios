import React, { Component } from 'react'
import {
  View,
  TouchableHighlight,
  WebView,
  ListView,
  Image,
  StyleSheet,
  Text,
  Button,
  RefreshControl,
} from 'react-native'

export default class extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      refreshing: false,
      dataSource: ds,
      itemsForDS: [{ title: 'Default item' }]
    }
    this.listupFromStorage = this.listupFromStorage.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.openWebView = this.openWebView.bind(this)
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.listupFromStorage()    
  }

  renderItem(item) {
    return (
      <TouchableHighlight onPress={() => this.openWebView(item)}>
        <View style={styles.item}>
          <Image
            style={styles.thumbnail}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          />
          <Text>{ item.title }</Text>
        </View>
      </TouchableHighlight>
    )
  }

  listupFromStorage() {
    global.storage.load({
      key: 'catalog',
    }).then(catalog => {
      const itemsForDS = this.makeItemsForDS(catalog)
      this.setState({
        refreshing: false,
        itemsForDS: itemsForDS,
        dataSource: this.state.dataSource.cloneWithRows(itemsForDS)
      })
    }).catch(err => {
      console.warn('[Error Message from Storage]', err);
    })
  }

  makeItemsForDS(catalog) {
    let items = []
    Object.keys(catalog).forEach(function(key) {
      items.push(catalog[key])
    })
    return items
  }

  openWebView(item) {
    this.props.navigator.push({
      title: '',
      component: itemWebView,
      passProps: { item }
    })
  }

  componentDidMount() {
    this.listupFromStorage()
  }

  render() {
    return (
      <View style={styles.wrap}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderItem}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          style={styles.itemList}
        />
      </View>
    )
  }
}

class itemWebView extends Component{
  render() {
    return (
      <WebView source={{uri: this.props.item.url}} />
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  itemList: {
    flex: 1,
    backgroundColor: '#FFCCAA',
  },
  item: {
    flexDirection: 'row',
    height: 50,
  },
  thumbnail: {
    width: 50,
    height: 50,
  },
})
