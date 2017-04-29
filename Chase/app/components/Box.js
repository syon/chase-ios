import React, { Component } from 'react'
import {
  TouchableOpacity,
  ListView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import SceneSelector from '../components/SceneSelector'

export default class extends Component {
  constructor(props) {
    super(props)
    this.onBoxPressed = this.onBoxPressed.bind(this)
    this.sceneSelected = this.sceneSelected.bind(this)
  }

  makeThumb(item) {
    const imgUrl = this.makeImgUrl(item)
    return (
      <Image style={styles.thumbnail} source={{uri: imgUrl}} />
    )
  }

  makeImgUrl(item) {
    const thumbsPath = 'https://d2aed4ktvx51jm.cloudfront.net/items/thumbs'
    const item10Id = `0000000000${item.itemId}`.substr(-10, 10)
    const itemId3 = item10Id.slice(0, 3)
    return `${thumbsPath}/${itemId3}/${item10Id}.jpg`
  }

  onBoxPressed() {
    const { item, work, actions } = this.props
    const imgUrl = this.makeImgUrl(this.props.item)
    this.props.navigator.push({
      screen: "Chase.Interlude",
      passProps: { item, work, actions, imgUrl },
      navigatorStyle: {
        tabBarHidden: true,
      },
    });
  }

  judgeArchived(item, work) {
    try {
      return work[item.itemId].archive
    } catch(e) {}
    return false
  }

  sceneSelected() {
    const { actions, item } = this.props
    this.setState({ done: true })
    actions.archive(item.itemId)
  }

  render() {
    const { item, work } = this.props
    if (!item) { return null }
    const thumb = this.makeThumb(item)
    let imageOpcty = this.judgeArchived(item, work) ? 0.5 : 1
    let archivedBG = this.judgeArchived(item, work) ? '#aaa' : '#fff'
    return (
      <View style={[styles.box, {backgroundColor: archivedBG}]}>
        <TouchableWithoutFeedback onPress={this.onBoxPressed}>
          <View>
            <View style={[styles.thumbWrap, {opacity: imageOpcty}]}>
              { thumb }
            </View>
            <View style={styles.boxBody}>
              <Text style={styles.itemTitle}>{ item.title }</Text>
              <Text style={styles.domain}>{ item.fqdn }</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <SceneSelector {...this.props} sceneSelected={this.sceneSelected} />
      </View>
    )
  }
}

let styles = StyleSheet.create({
  box: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1,
    shadowOpacity: 0.2,
  },
  thumbWrap: {
    flex: 1,
    height: 100,
  },
  thumbnail: {
    flex: 1,
  },
  boxBody: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  itemTitle: {
    fontSize: responsiveFontSize(2.5),
    lineHeight: responsiveFontSize(3),
    marginBottom: 3,
  },
  domain: {
    fontSize: responsiveFontSize(1.5),
    color: '#a3aab1',
  },
  selectScene: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5,
  },
  sceneBtn: {
    fontSize: responsiveFontSize(2),
    padding: 10,
    overflow: 'hidden',
  },
})
