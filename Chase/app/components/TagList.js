import React, { Component } from 'react'
import {
  TouchableOpacity,
  ListView,
  StyleSheet,
  View,
  Text,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

export default class extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      refreshing: false,
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    }
    this._renderRow = this._renderRow.bind(this)
  }

  _renderRow(rowData) {
    const tag = rowData
    const _onPress = () => {
      console.info('★', rowData.name, this.props)
      this.props.navigator.push({
        title: tag.name,
        screen: 'Chase.TagsTabInnerScreen',
        passProps: { tag, ...this.props },
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
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(this.props.tagsArr)}
        renderRow={this._renderRow}
        enableEmptySections={true}
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
