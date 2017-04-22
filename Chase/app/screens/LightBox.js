import React, { Component } from 'react'
import { View, Button, StyleSheet, Text, Image } from 'react-native'

class LightBox extends Component {
  constructor(props) {
    super(props);
    this.openWebView = this.openWebView.bind(this)
  }

  openWebView() {
    const { item } = this.props
    this.props.navigator.push({
      title: '',
      screen: 'Chase.WebViewScreen',
      passProps: { item },
      navigatorStyle: {
        navBarHideOnScroll: true,
        statusBarHideWithNavBar: true,
        tabBarHidden: true,
      },
    })
  }

  render() {
    const { login, actions, item, imgUrl } = this.props
    return (
      <View style={styles.welcome}>
        <View style={styles.imgFrame}>
          <Image style={styles.thumbnail} source={{uri: imgUrl}} />
        </View>
        <Text>{item.title}</Text>
        <Button onPress={this.openWebView} title="openWebView" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
  },
  imgFrame: {
    height: 200,
  },
  thumbnail: {
    flex: 1,
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
)(LightBox)
