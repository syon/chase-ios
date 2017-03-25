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
