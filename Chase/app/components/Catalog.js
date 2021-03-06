import React, { Component } from 'react'
import {
  View,
  FlatList,
  SegmentedControlIOS,
  StyleSheet,
} from 'react-native'

import Box from './Box'

class ThisClass extends Component {
  constructor(props) {
    super(props)
    this.getCatalogRows = this.getCatalogRows.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  renderItem({ item }) {
    const { entries: givenEntries } = this.props.reducers
    const { navigator, sceneSelectorHidden: h } = this.props
    const entries = givenEntries || {}
    const entry = entries[item.itemId] || {}
    return (
      <Box
        navigator={navigator}
        entry={entry}
        sceneSelectorHidden={h}
      />
    )
  }

  getCatalogRows() {
    const cHash = this.props.catalogState.catalogHash
    if (!cHash) { return [{}] }
    let rows = []
    Object.keys(cHash).forEach(key => {
      rows.push(cHash[key])
    })
    rows = rows.sort((a, b) => {
      if (a.sortId < b.sortId) return -1
      if (a.sortId > b.sortId) return 1
      return 0
    })
    return rows
  }

  render() {
    const { scene } = this.props.reducers
    const { actions, showSegment } = this.props
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
        <FlatList
          data={this.getCatalogRows()}
          renderItem={this.renderItem}
          onRefresh={this.props.onRefresh.bind(this)}
          refreshing={this.props.catalogState.refreshing}
          contentInset={{ top: 0, left: 0, bottom: 50, right: 0 }}
          style={styles.itemList}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'rgb(240, 239, 245)',
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

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions/allActions'

export default connect(
  (state) => ({
    reducers: {
      phase: state.phase,
      shelf: state.shelf,
      scene: state.scene,
      work: state.work,
      entries: state.entries,
    },
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch),
  })
)(ThisClass)
