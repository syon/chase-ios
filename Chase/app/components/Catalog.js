import React, { Component } from 'react'
import { View, WebView, ListView, Image, StyleSheet, Text, Button } from 'react-native'

class itemWebView extends Component{
  render() {
    return (
      <WebView source={{uri: 'https://facebook.github.io/react-native/'}} />
    )
  }
}

export default class extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds,
      itemsForDS: [{ title: 'Default item' }]
    }
    this.listupFromStorage = this.listupFromStorage.bind(this)
    this.openWebView = this.openWebView.bind(this)
  }

  renderItem(item) {
    return (
      <View style={styles.item}>
        <Image
          style={styles.thumbnail}
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
        />
        <Text>{ item.title }</Text>
      </View>
    )
  }

  listupFromStorage() {
    global.storage.load({
      key: 'catalog',
    }).then(catalog => {
      console.info('Loaded Catalog from storage', catalog)
      const itemsForDS = this.makeItemsForDS(catalog)
      this.setState({
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
      const m = catalog[key]
      const title = m.resolved_title ? m.resolved_title : m.given_title
      const url = m.resolved_url ? m.resolved_url : m.given_url
      items.push({ title, url })
    })
    return items
  }

  openWebView() {
    this.props.navigator.push({
      title: 'My WebView',
      component: itemWebView,
      passProps: {}
    })
  }

  render() {
    console.log('I am Catalog render - this.props is', this.props)
    const { actions, theListData } = this.props
    return (
      <View style={styles.wrap}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderItem}
          style={styles.itemList}
        />
        <View style={styles.itemList}>
          <Text style={styles.count}>{this.state.count}</Text>
          <Button onPress={this.listupFromStorage} title="listupFromStorage" />
          <Button onPress={actions.loadPages} title="Load to Storage" />
          <Text>{theListData.length}</Text>
          <Button onPress={this.openWebView} title="openWebView" />
          <Image
            style={styles.thumbnail}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          />
        </View>
      </View>
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
  count: {
    backgroundColor: '#CCCCFF',
  }
});
