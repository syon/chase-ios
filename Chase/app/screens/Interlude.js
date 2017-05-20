import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback } from 'react-native'
import Button from 'react-native-button'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import SafariView from 'react-native-safari-view'

import SceneSelector from '../components/SceneSelector'

class ThisClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      processing: false,
      tagInput: '',
      tagsRegistered: [],
    }
    this.openWebView = this.openWebView.bind(this)
    this.onPressArchiveBtn = this.onPressArchiveBtn.bind(this)
    this.onPressTagBtn = this.onPressTagBtn.bind(this)
  }

  openWebView() {
    const { entry } = this.props
    if (!entry || !entry.url) { return }
    SafariView.isAvailable()
      .then(SafariView.show({
        url: entry.url
      }))
      .catch(err => {
        // Fallback WebView code for iOS 8 and earlier
        console.tron.error(err)
      });
  }

  judged(entry, work) {
    try {
      if (this.state.processing) { return true }
      return !!work[entry.eid]
    } catch(e) {}
    return false
  }

  onPressArchiveBtn() {
    const { entry } = this.props
    this.setState({ processing: true })
    this.props.actions.archive(entry.eid).then(() => {
      this.setState({ processing: false })
    })
  }

  onPressTagBtn() {
    const { entry } = this.props
    const arg = { itemId: entry.eid, tagNm: this.state.tagInput }
    this.props.actions.addTag(arg).then(tagNm => {
      let tagsRegistered = this.state.tagsRegistered
      tagsRegistered.push(tagNm)
      this.setState({ tagsRegistered, tagInput: '' })
    })
  }

  render() {
    const { work, scene } = this.props.reducers
    const { entry, actions, imgUrl } = this.props
    const hasJudged = this.judged(entry, work)
    let imageOpcty = hasJudged ? 0.5 : 1
    let archivedBG = hasJudged ? '#eee' : '#fff'
    const archiveBtnIcon = this.state.processing ? '...' : '✓'
    let tags = []
    Object.keys(entry.tags || []).map(tag => {
      tags.push(
        <View style={styles.tagChip}>
          <Text style={styles.tagChipText}>{ tag }</Text>
        </View>
      )
    })
    this.state.tagsRegistered.map(tag => {
      tags.push(
        <View style={styles.tagChip}>
          <Text style={styles.tagChipText}>{ tag }</Text>
        </View>
      )
    })
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
              <Button onPress={this.onPressArchiveBtn} disabled={hasJudged} style={styles.btnArchive}>
                { archiveBtnIcon }
              </Button>
            </View>
          </View>
          <View>
            <Text style={styles.desc}>{ entry.description }</Text>
          </View>
        </View>
        <View style={styles.tagInputBox}>
          <TextInput
            value={this.state.tagInput}
            onChangeText={(text) => this.setState({ tagInput: text })}
            onSubmitEditing={this.onPressTagBtn}
            placeholder={'Enter tag name'}
            style={styles.input}
          />
        </View>
        <View style={styles.tagChipBox}>{ tags }</View>
        <View style={{paddingBottom: 300}}>
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
    fontSize: responsiveFontSize(4),
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
  tagInputBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
    marginBottom: 0,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 5,
    fontSize: responsiveFontSize(2),
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  tagChipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    margin: 20,
    marginTop: 5,
  },
  tagChip: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#bbb',
    marginRight: 5,
    marginBottom: 5,
  },
  tagChipText: {
    color: '#fff',
    padding: 4,
  },
})

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions/allActions'

export default connect(
  (state, ownProps) => ({
    reducers: {
      phase: state.phase,
      shelf: state.shelf,
      scene: state.scene,
      work: state.work,
      entries: state.entries,
    }
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(ThisClass)
