import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import Button from 'react-native-button'

class Interlude extends Component {
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
        <View style={styles.boxBody}>
          <Text style={styles.itemTitle}>{ item.title }</Text>
          <View style={styles.toolbar}>
            <View style={styles.toolbarLeft}>
              <Text style={styles.domain}>www000000000000000.example.com</Text>
              <Text style={styles.date}>2017.4.17</Text>
            </View>
            <View style={styles.toolbarRight}>
              <Button onPress={() => {}} style={styles.sceneBtn}>✓</Button>
            </View>
          </View>
        </View>
        <Button onPress={this.openWebView}>openWebView</Button>
        <View style={styles.selectScene}>
          <Button onPress={() => {}} style={styles.sceneBtn}>自宅</Button>
          <Button onPress={() => {}} style={styles.sceneBtn}>職場</Button>
          <Button onPress={() => {}} style={styles.sceneBtn}>暇つぶし</Button>
        </View>
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
  boxBody: {
    padding: 20,
  },
  itemTitle: {
    fontSize: 16,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
  },
  date: {
    fontSize: 12,
  },
  domain: {
    fontSize: 12,
    color: '#a3aab1',
  },
  selectScene: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5,
  },
  sceneBtn: {
    fontSize: 14,
    padding: 10,
    overflow: 'hidden',
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
)(Interlude)
