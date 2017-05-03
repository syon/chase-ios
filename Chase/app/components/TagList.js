import React, { Component } from 'react'
import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  Text,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
    }
    this._renderItem = this._renderItem.bind(this)
  }

  _renderItem({ item: tag }) {
    const { navigator, actions } = this.props
    const _onPress = () => {
      console.tron.info('TagList#_onPress -- Loading...', tag.name)
      actions.refreshTagCatalog(tag.name).then(() => {
        console.tron.info('TagList#_onPress -- Done.', tag.name)
        navigator.push({
          title: tag.name,
          screen: 'Chase.TagsTabInnerScreen',
          passProps: { tag, ...this.props },
        })
      })
    }
    return (
      <TouchableOpacity onPress={ _onPress } style={styles.row}>
        <View style={styles.rowLeft}>
          <Icon style={styles.tagIcon} name="ios-pricetag" size={20} />
          <Text style={styles.tagName}>{ tag.name }</Text>
        </View>
        <View style={styles.rowRight}>
          <Icon style={styles.chevronIcon} name="ios-arrow-forward" size={20} />
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <FlatList
        data={this.props.tagsArr}
        renderItem={this._renderItem}
        refreshing={this.state.refreshing}
      />
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagIcon: {
    width: 40,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ddd'
  },
  tagName: {
    fontSize: responsiveFontSize(2.5),
  },
  chevronIcon: {
    width: 30,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ddd'
  },
  badge: {
    padding: 10,
    color: 'rgb(51, 123, 246)'
  },
})
