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
    const thumbsPath = 'https://d2aed4ktvx51jm.cloudfront.net/items/thumbs'
    const item10Id = `0000000000${item.itemId}`.substr(-10, 10)
    const itemId3 = item10Id.slice(0, 3)
    const imgUrl = `${thumbsPath}/${itemId3}/${item10Id}.jpg`
    return (
      <TouchableHighlight onPress={() => this.openWebView(item)}>
        <View style={styles.item}>
          <Image
            style={styles.thumbnail}
            source={{uri: imgUrl}}
          />
          <Text>{ item.title }</Text>
        </View>
      </TouchableHighlight>
    )
  }

  listupFromStorage() {
    this.props.actions.refreshCatalog()
      .then(() => {
        console.log('リフレッシュCatalogおわったよ')
      })
      .then(() => {
        console.log('ストレージのロード始めます')
        return global.storage.load({
          key: 'catalog',
        }).catch(err => {
          console.warn('[Error on Storage Loading]', err);
        })
      })
      .then(catalog => {
        console.log('ストレージのロードできました→', catalog)
        const itemsForDS = this.makeItemsForDS(catalog)
        console.log('リストをソートしました', itemsForDS)
        console.log('リストを描画します')
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
    items = items.sort((a,b) => {
      if (a.sortId < b.sortId) return -1
      if (a.sortId > b.sortId) return 1
      return 0
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
