import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import Button from 'react-native-button'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

import SceneSelector from '../components/SceneSelector'

class Interlude extends Component {
  constructor(props) {
    super(props);
    this.openWebView = this.openWebView.bind(this)
    this.onPressArchiveBtn = this.onPressArchiveBtn.bind(this)
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

  onPressArchiveBtn() {
    const { item, actions } = this.props
    actions.archive(item.itemId)
  }

  render() {
    const { login, actions, item, imgUrl, work } = this.props
    return (
      <View style={styles.welcome}>
        <View style={styles.imgFrame}>
          <Image style={styles.thumbnail} source={{uri: imgUrl}} />
        </View>
        <View style={styles.boxBody}>
          <Text style={styles.itemTitle}>{ item.title }</Text>
          <View style={styles.toolbar}>
            <View style={styles.toolbarLeft}>
              <Text style={styles.domain}>{ item.fqdn }</Text>
              <Text style={styles.date}>2017.4.17</Text>
            </View>
            <View style={styles.toolbarRight}>
              <Button onPress={this.onPressArchiveBtn}>✓</Button>
            </View>
          </View>
        </View>
        <Button onPress={this.openWebView}>openWebView</Button>
        <SceneSelector {...this.props} />
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
    fontSize: responsiveFontSize(2.5),
    lineHeight: responsiveFontSize(3),
    marginBottom: 3,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
  },
  date: {
    fontSize: responsiveFontSize(1.5),
    lineHeight: responsiveFontSize(2),
    color: '#a3aab1',
  },
  domain: {
    fontSize: responsiveFontSize(1.5),
    lineHeight: responsiveFontSize(2),
    color: '#a3aab1',
  },
  selectScene: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5,
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
