import React, { Component } from 'react'
import {
  ListView,
  View,
  Text,
} from 'react-native'

export default class extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      refreshing: false,
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    }
  }

  _renderRow(rowData) {
    return (
      <View>
        <Text>{ rowData.name } -- { rowData.items.length }</Text>
      </View>
    )
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(this.props.tagsArr)}
        renderRow={this._renderRow}
      />
    )
  }
}
