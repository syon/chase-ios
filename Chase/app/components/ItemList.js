import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'

export default class Chase extends Component {
  render() {
    const { items } = this.props;

    let itemList = []
    Object.keys(items.itemList).forEach(function(key) {
      const m = items.itemList[key]
      const title = m.resolved_title ? m.resolved_title : m.given_title
      const url = m.resolved_url ? m.resolved_url : m.given_url
      itemList.push(
        <View key={key} style={styles.item}>
          <Text>{ title }</Text>
          <Text>{ url }</Text>
        </View>
      )
    })

    return (
      <ScrollView style={styles.itemList}>
        { itemList }
      </ScrollView>
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
