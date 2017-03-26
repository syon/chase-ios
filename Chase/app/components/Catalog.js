import React, { Component } from 'react'
import {
  View,
  ListView,
  SegmentedControlIOS,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Text,
  RefreshControl,
  ActionSheetIOS,
} from 'react-native'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

const AS_BTN_TAGS = ['chase:a', 'chase:b', 'chase:c']
const AS_BTNS_CIDX = 3

export default class extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      refreshing: false,
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    }
    this.renderRowFront = this.renderRowFront.bind(this)
    this.renderRowBack = this.renderRowBack.bind(this)
    this.onSwipe = this.onSwipe.bind(this)
    this.openWebView = this.openWebView.bind(this)
    this.getCatalogRows = this.getCatalogRows.bind(this)
  }

  renderRowFront(item) {
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

  renderRowBack(item) {
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

  onSwipe(_, idx) {
    const catalogRows = this.getCatalogRows()
    const swipedItem = catalogRows[idx]
    console.info('swipedItem is', swipedItem);
    ActionSheetIOS.showActionSheetWithOptions({
      options: [...this.props.scene.allScenes, 'Cancel'],
      cancelButtonIndex: AS_BTNS_CIDX
    },
    ((buttonIndex) => {
      switch(buttonIndex) {
        case(AS_BTNS_CIDX):
          console.info('Canceled.')
          break
        default:
          this.props.actions.addTag(swipedItem.itemId, AS_BTN_TAGS[buttonIndex])
      }
    }).bind(this))
  }

  openWebView(item) {
    this.props.navigator.push({
      title: '',
      screen: 'Chase.WebViewScreen',
      passProps: { item },
      navigatorStyle: {
        navBarHideOnScroll: true,
        statusBarHideWithNavBar: true,
        tabBarHidden: true,
      },
    })
  }

  getCatalogRows() {
    const cHash = this.props.catalogState.catalogHash
    if (!cHash) { return [] }
    let rows = []
    Object.keys(cHash).forEach(function(key) {
      rows.push(cHash[key])
    })
    rows = rows.sort((a,b) => {
      if (a.sortId < b.sortId) return -1
      if (a.sortId > b.sortId) return 1
      return 0
    })
    return rows
  }

  render() {
    const { scene, actions, showSegment, catalogState } = this.props
    const segment = showSegment ? (
      <SegmentedControlIOS
        values={scene.allScenes}
        selectedIndex={scene.currentIdx}
        onChange={(event) => {
          actions.changeScene(event.nativeEvent.selectedSegmentIndex)
        }}
        style={styles.segment}
      />
    ) : null

    return (
      <View style={styles.wrap}>
        { segment }
        <SwipeListView
          dataSource={this.state.dataSource.cloneWithRows(this.getCatalogRows())}
          renderRow={(data, secId, rowId) => (
            <SwipeRow
              leftOpenValue={75}
              rightOpenValue={-75}
              disableLeftSwipe={true}
            >
              { this.renderRowBack(data) }
              { this.renderRowFront(data) }
            </SwipeRow>
          )}
          onRowOpen={this.onSwipe}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.props.onRefresh.bind(this)}
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
  segment: {
    margin: 10,
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
