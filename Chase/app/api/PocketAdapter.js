import { CONSUMER_KEY, REDIRECT_URI } from 'react-native-dotenv'

import * as PocketAPI from './PocketAPI'

let memAccessToken = null

export function setAccessToken(at) {
  memAccessToken = at
  console.info('AccessToken has set.', at)
}

export async function getAllUntaggedItems() {
  const params = {
    state: 'unread',
    tag: '_untagged_',
    count: 20,
    sort: 'newest',
    detailType: 'simple',
  }
  return await PocketAPI.get(CONSUMER_KEY, memAccessToken, params)
}

export async function getItemsTaggedBy(tagNm) {
  const params = {
    state: 'unread',
    tag: tagNm,
    count: 20,
    sort: 'newest',
    detailType: 'simple',
  }
  return await PocketAPI.get(CONSUMER_KEY, memAccessToken, params)
}

export async function getAllTags() {
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
        tags[tagKey] = theTag
      })
    }
  })
  console.tron.display({ name: 'Adapter#getAllTags', preview: 'Done.', value: tags })
  return 
}
