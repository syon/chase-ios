import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native'

import TagList from '../components/TagList'

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
    const tagsArr = []
    Object.keys(tags).forEach((tagKey) => {
      tagsArr.push(tags[tagKey])
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
        <TagList tagsArr={tagsArr} />
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
