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
    loaded: 0,
  }

  _onRefresh = () => {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
      });
    }, 5000);
  }

  render() {
    const { login, actions } = this.props;
    return (
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }>
        <View style={styles.welcome}>
          <Button onPress={actions.testPocketAdapter} title="API Test" />
          <Text>{ this.state.loaded }</Text>
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
    login: state.login,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(TagsTab)
