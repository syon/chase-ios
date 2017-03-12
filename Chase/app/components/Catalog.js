import React, { Component } from 'react'
import {
  View,
  TouchableWithoutFeedback,
  ListView,
  Image,
  StyleSheet,
  Text,
  Button,
  RefreshControl,
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import WKWebView from 'react-native-wkwebview-reborn'

import MyWebView from './MyWebView'

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
    this.renderHidden = this.renderHidden.bind(this)
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
      <TouchableWithoutFeedback onPress={() => this.openWebView(item)}>
        <View style={styles.rowFront}>
          <Image
            style={styles.thumbnail}
            source={{uri: imgUrl}}
          />
          <View style={styles.itemBody}>
            <Text style={styles.title}>{ item.title }</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderHidden(item) {
    return (
      <View style={styles.rowBack}>
        <TouchableWithoutFeedback onPress={() => {console.log('★L')}}>
          <View style={styles.rowBackBtnL} >
            <Text>Left</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {console.log('★R')}}>
          <View style={styles.rowBackBtnR} >
            <Text>Right</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
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
      component: MyWebView,
      passProps: { item }
    })
  }

  componentDidMount() {
    this.listupFromStorage()
  }

  render() {
    return (
      <View style={styles.wrap}>
        <SwipeListView
          dataSource={this.state.dataSource}
          renderRow={this.renderItem}
          renderHiddenRow={this.renderHidden}
          leftOpenValue={75}
          rightOpenValue={-75}
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

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  itemList: {
    flex: 1,
  },
  rowFront: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    backgroundColor: '#fff',
  },
  itemBody: {
    flex: 1,
    padding: 7,
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowBackBtnL: {
    paddingLeft: 15,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  rowBackBtnR: {
    paddingRight: 15,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  thumbnail: {
    width: 60,
    height: 60,
  },
})
