import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, TouchableWithoutFeedback } from 'react-native'
import Button from 'react-native-button'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

import SceneSelector from '../components/SceneSelector'

class Interlude extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
    }
    this.openWebView = this.openWebView.bind(this)
    this.judgeArchived = this.judgeArchived.bind(this)
    this.onPressArchiveBtn = this.onPressArchiveBtn.bind(this)
    this.sceneSelected = this.sceneSelected.bind(this)
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

  judgeArchived(item, work) {
    try {
      if (this.state.done) { return true }
      return work[item.itemId].archive
    } catch(e) {}
    return false
  }

  onPressArchiveBtn() {
    this.setState({ done: true })
    const { item, actions } = this.props
    actions.archive(item.itemId)
  }

  sceneSelected() {
    const { actions, item } = this.props
    this.setState({ done: true })
    actions.archive(item.itemId)
  }

  render() {
    const { actions, item, pageinfo, imgUrl, work } = this.props
    const isDone = this.judgeArchived(item, work)
    let imageOpcty = isDone ? 0.5 : 1
    let archivedBG = isDone ? '#aaa' : '#fff'
    let pi = {}
    try { pi = pageinfo[item.itemId] } catch(e) {}
    return (
      <View style={[styles.welcome, {backgroundColor: archivedBG}]}>
        <TouchableWithoutFeedback onPress={this.openWebView}>
          <View>
            <View style={[styles.imgFrame, {opacity: imageOpcty}]}>
              <Image style={styles.thumbnail} source={{uri: imgUrl}} />
            </View>
            <View style={styles.itemTitleFrame}>
              <Text style={styles.itemTitle}>{ item.title }</Text>
              <Text style={styles.itemTitle}>{ pi.title }</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.boxBody}>
          <View style={styles.toolbar}>
            <View style={styles.toolbarLeft}>
              <Text style={styles.domain}>{ item.fqdn }</Text>
              <Text style={styles.date}>2017.4.17</Text>
            </View>
            <View style={styles.toolbarRight}>
              <Button onPress={this.onPressArchiveBtn} disabled={isDone} style={styles.btnArchive}>✓</Button>
            </View>
          </View>
          <View>
            <Text>{ pi.description }</Text>
          </View>
        </View>
        <SceneSelector
          {...this.props}
          sceneSelected={this.sceneSelected}
        />
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
    paddingTop: 10,
  },
  itemTitleFrame: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  itemTitle: {
    fontSize: responsiveFontSize(2.5),
    lineHeight: responsiveFontSize(3),
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
  btnArchive: {
    fontSize: responsiveFontSize(3),
    padding: 15,
  },
  selectScene: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5,
  },
})

export default Interlude
