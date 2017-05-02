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

  makeThumb(entry) {
    const imgUrl = this.makeImgUrl(entry)
    return (
      <Image
        style={styles.thumbnail}
        source={{uri: imgUrl}}
        onError={() => { this.onErrorLoadImage(entry) }}
      />
    )
  }

  onErrorLoadImage(entry) {
    console.tron.info('Box#onErrorLoadImage', entry)
    return
  }

  makeImgUrl(entry) {
    const thumbsPath = 'https://d2aed4ktvx51jm.cloudfront.net/items/thumbs'
    const item10Id = `0000000000${entry.eid}`.substr(-10, 10)
    const itemId3 = item10Id.slice(0, 3)
    return `${thumbsPath}/${itemId3}/${item10Id}.jpg`
  }

  onBoxPressed() {
    const { item, work, entry, actions, sceneSelectorHidden } = this.props
    const imgUrl = this.makeImgUrl(this.props.entry)
    this.props.navigator.push({
      screen: "Chase.Interlude",
      passProps: {...this.props, imgUrl},
      navigatorStyle: {
        tabBarHidden: true,
      },
    });
  }

  judgeArchived(entry, work) {
    try {
      return work[entry.eid].archive
    } catch(e) {}
    return false
  }

  sceneSelected() {
    const { actions, item } = this.props
    this.setState({ done: true })
    actions.archive(item.itemId)
  }

  render() {
    const { item, work, entry, sceneSelectorHidden } = this.props
    if (!item) { return null }
    const thumb = this.makeThumb(entry)
    let imageOpcty = this.judgeArchived(entry, work) ? 0.5 : 1
    let archivedBG = this.judgeArchived(entry, work) ? '#aaa' : '#fff'
    return (
      <View style={[styles.box, {backgroundColor: archivedBG}]}>
        <TouchableWithoutFeedback onPress={this.onBoxPressed}>
          <View>
            <View style={[styles.thumbWrap, {opacity: imageOpcty}]}>
              { thumb }
            </View>
            <View style={styles.boxBody}>
              <Text style={styles.itemTitle}>{ entry.title }</Text>
              <Text style={styles.domain}>{ entry.fqdn }</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <SceneSelector
          {...this.props}
          sceneSelected={this.sceneSelected}
          hidden={sceneSelectorHidden}
        />
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
