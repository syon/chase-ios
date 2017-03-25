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
    const { login, tags, actions } = this.props
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
        <TagList tagsArr={tagsArr} {...this.props} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    backgroundColor: 'rgb(240, 239, 245)',
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
    login: state.login,
    tags: state.tags,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(TagsTab)
