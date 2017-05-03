import React, { Component } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native'
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import * as ChaseDriver from '../api/ChaseDriver'
import SceneSelector from '../components/SceneSelector'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingImage: false,
      alreadyTryed: false,
      thumbBaseUrl: ChaseDriver.CHASE_THUMBS_CF_PATH,
    }
    this.onBoxPressed = this.onBoxPressed.bind(this)
    this.sceneSelected = this.sceneSelected.bind(this)
    this.onErrorLoadImage = this.onErrorLoadImage.bind(this)
  }

  makeThumb(entry) {
    if (!entry.eid || this.state.loadingImage) {
      return (<ActivityIndicator animating={true} style={styles.thumbnail} />)
    }
    return (
      <Image
        style={styles.thumbnail}
        source={{ uri: `${this.state.thumbBaseUrl}/${entry.image}` }}
        onError={() => { this.onErrorLoadImage(entry) }}
      />
    )
  }

  onErrorLoadImage(entry) {
    // console.tron.info('Box#onErrorLoadImage', { eid: entry.eid, title: entry.title })
    if (!this.state.alreadyTryed) {
      this.setState({ loadingImage: true })
      const promise = this.props.actions.makeNewThumb(entry)
      promise.then(() => {
        this.setState({
          loadingImage: false,
          alreadyTryed: true,
          thumbBaseUrl: ChaseDriver.CHASE_THUMBS_S3_PATH,
        })
      })
    }
    return
  }

  onBoxPressed() {
    const { item, work, entry, actions, sceneSelectorHidden } = this.props
    const imgUrl = `${this.state.thumbBaseUrl}/${entry.image}`
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
