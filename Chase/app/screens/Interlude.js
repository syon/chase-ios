import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Text, Image, TouchableWithoutFeedback } from 'react-native'
import Button from 'react-native-button'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

import SceneSelector from '../components/SceneSelector'

class Interlude extends Component {
  constructor(props) {
    super(props)
    this.openWebView = this.openWebView.bind(this)
    this.onPressArchiveBtn = this.onPressArchiveBtn.bind(this)
  }

  openWebView() {
    const { entry } = this.props
    this.props.navigator.push({
      title: '',
      screen: 'Chase.WebViewScreen',
      passProps: { url: entry.url },
      navigatorStyle: {
        navBarHideOnScroll: true,
        statusBarHideWithNavBar: true,
        tabBarHidden: true,
      },
    })
  }

  judged(entry, work) {
    try {
      return !!work[entry.eid]
    } catch(e) {}
    return false
  }

  onPressArchiveBtn() {
    const { entry } = this.props.reducers
    this.setState({ done: true })
    this.props.actions.archive(entry.eid)
  }

  render() {
    const { entry, work, scene } = this.props.reducers
    const { actions, imgUrl } = this.props
    const hasJudged = this.judged(entry, work)
    let imageOpcty = hasJudged ? 0.5 : 1
    let archivedBG = hasJudged ? '#aaa' : '#fff'
    return (
      <ScrollView style={[styles.container, {backgroundColor: archivedBG}]}>
        <TouchableWithoutFeedback onPress={this.openWebView}>
          <View>
            <View style={[styles.imgFrame, {opacity: imageOpcty}]}>
              <Image style={styles.thumbnail} source={{uri: imgUrl}} />
            </View>
            <View style={styles.itemTitleFrame}>
              <Text style={styles.itemTitle}>{ entry.title }</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.boxBody}>
          <View style={styles.toolbar}>
            <View style={styles.toolbarLeft}>
              <Text style={styles.domain}>{ entry.siteName }</Text>
              <Text style={styles.domain}>{ entry.fqdn }</Text>
              <Text style={styles.date}>{ entry.date }</Text>
            </View>
            <View style={styles.toolbarRight}>
              <Button onPress={this.onPressArchiveBtn} disabled={hasJudged} style={styles.btnArchive}>✓</Button>
            </View>
          </View>
          <View>
            <Text style={styles.desc}>{ entry.description }</Text>
          </View>
        </View>
        <View style={{paddingBottom: 80}}>
          <SceneSelector
            actions={actions}
            reducers={{ entry, work, scene }}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
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
    fontSize: responsiveFontSize(1.75),
    lineHeight: responsiveFontSize(2),
    color: '#a3aab1',
  },
  domain: {
    fontSize: responsiveFontSize(1.75),
    lineHeight: responsiveFontSize(2),
    color: '#a3aab1',
  },
  btnArchive: {
    fontSize: responsiveFontSize(3),
    padding: 15,
  },
  desc: {
    color: '#586069',
    fontSize: responsiveFontSize(1.75),
    lineHeight: responsiveFontSize(2),
  },
  selectScene: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5,
  },
})

export default Interlude
