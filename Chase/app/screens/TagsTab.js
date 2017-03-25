import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native'

class TagsTab extends Component {

  state = {
    isRefreshing: false,
  }

  _onRefresh = async () => {
    this.setState({ isRefreshing: true })
    await this.props.actions.refreshAllTags()
    this.setState({ isRefreshing: false })
  }

  render() {
    const { tags, actions } = this.props
    const elems = []
    Object.keys(tags).forEach((tagKey) => {
      tagObj = tags[tagKey]
      elems.push(
        <View>
          <Text>{ tagObj.name } -- { tagObj.items.length }</Text>
        </View>
      )
    })
    return (
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <View style={styles.welcome}>
          { elems }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },
  welcome: {
    margin: 10,
  },
})

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions/allActions'

export default connect(
  (state, ownProps) => ({
    tags: state.tags,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(TagsTab)
