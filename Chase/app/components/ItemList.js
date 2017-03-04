import React, { Component } from 'react'
import { View, ListView, StyleSheet, ScrollView, Text } from 'react-native'

export default class Chase extends Component {
  constructor() {
    super()
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows([]),
    }
  }

  renderItem(item) {
    return (
      <View>
        <Text>{ item.title }</Text>
        <Text>{ item.url }</Text>
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
    height: 50,
  }
});
