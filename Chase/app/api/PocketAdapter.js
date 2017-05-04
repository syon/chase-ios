import { CONSUMER_KEY, REDIRECT_URI } from 'react-native-dotenv'

import * as PocketAPI from './PocketAPI'

let memAccessToken = null

export function hasAccessToken() {
  return !!memAccessToken
}

export function setAccessToken(at) {
  memAccessToken = at
  console.tron.info('AccessToken has set.', at)
}

export async function getAllUntaggedItems() {
  const params = {
    state: 'unread',
    tag: '_untagged_',
    count: 100,
    sort: 'newest',
    detailType: 'complete',
  }
  return await PocketAPI.get(CONSUMER_KEY, memAccessToken, params)
}

export async function getItemsTaggedBy(tagNm) {
  const params = {
    state: 'unread',
    tag: tagNm,
    count: 100,
    sort: 'newest',
    detailType: 'complete',
  }
  return await PocketAPI.get(CONSUMER_KEY, memAccessToken, params)
}

export async function getAllTags() {
  if (!memAccessToken) { return }
  console.tron.info('Adapter#getAllTags - start')
  const params = {
    state: 'unread',
    count: 100,
    sort: 'newest',
    detailType: 'complete',
  }
  const result = await PocketAPI.get(CONSUMER_KEY, memAccessToken, params)
  const listFromPocket = result.list
  let tags = {}
  Object.keys(listFromPocket).forEach((key) => {
    const m = listFromPocket[key]
    if (m.tags) {
      Object.keys(m.tags).forEach((tagKey) => {
        tagObj = m.tags[tagKey]
        let theTag = tags[tagKey] || { name: tagObj.tag, items: []}
        theTag.items.push(tagObj.item_id)
        if (!tagKey.match(/^chase:(a|b|c)/)) {
          tags[tagKey] = theTag
        }
      })
    }
  })
  console.tron.info('Adapter#getAllTags - end', tags)
  return tags
}

export async function archive(itemId) {
  console.tron.start('Adapter#archive', itemId)
  const answer = await PocketAPI.archive(CONSUMER_KEY, memAccessToken, itemId)
  const result = (answer.status === 1) ? itemId : ''
  console.tron.end('Adapter#archive', result)
  return result
}

export async function addTag(itemId, tagNm) {
  console.tron.start('Adapter#addTag', { itemId, tagNm })
  const answer = await PocketAPI.tags_add(CONSUMER_KEY, memAccessToken, itemId, tagNm)
  const result = (answer.status === 1) ? tagNm : ''
  console.tron.end('Adapter#addTag', result)
  return result
}
