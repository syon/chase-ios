import React, { Component } from 'react'
import { View, ListView, Image, StyleSheet, Text } from 'react-native'

export default class extends Component {
  constructor() {
    super()
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows([]),
    }
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

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(this.props.listData)}
        renderRow={this.renderItem}
        style={styles.itemList}
      />
    )
  }
}

const styles = StyleSheet.create({
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
  }
});
