let catalogBySort = {}

import Libra from './LibraAPI'

export const CHASE_API_ENDPOINT = 'https://uysa8o7cq6.execute-api.us-east-1.amazonaws.com/prod'
export const CHASE_THUMBS_CF_PATH = 'https://d2aed4ktvx51jm.cloudfront.net'
export const CHASE_THUMBS_S3_PATH = 'https://s3.amazonaws.com/syon-chase'

export function makeCatalog(listFromPocket) {
  // console.tron.info('ChaseDriver#makeCatalog -- listFromPocket', listFromPocket)
  let catalog = {}
  let rawItems = {}
  Object.keys(listFromPocket).forEach((key) => {
    const m = listFromPocket[key]
    rawItems[key] = m
    itemId = m.item_id
    catalog[key] = {
      key: itemId,
      itemId: itemId,
      sortId: m.sort_id,
    }
    catalogBySort[m.sort_id] = itemId
  })
  return { catalog, rawItems }
}

export async function saveCatalogItemsAsEntryToStorage(rawItems) {
  // console.tron.info('ChaseDriver#saveCatalogItemsAsEntryToStorage -- rawItems', rawItems)
  let entries = await _loadEntriesFromStorage()
  const promises = []
  Object.keys(rawItems).forEach(itemId => {
    const item = rawItems[itemId]
    const existEntry = entries[itemId]
    if (!existEntry) {
      promises.push(_convertItemToEntry(item))
    }
  })
  await Promise.all(promises).then(values => {
    // console.tron.info('ChaseDriver#Promise.all Done!', values)
    values.forEach(v => { entries[v.eid] = v })
    // console.tron.info('ChaseDriver# -- NewEntries:', entries)
    global.storage.save({ key: 'entries', data: entries, expires: null })
  })
  return entries
}

export function callLambdaThumb(url, pocket_id) {
  return new Promise((resolve, reject) => {
    fetch(`${CHASE_API_ENDPOINT}/thumb?url=${url}&pocket_id=${pocket_id}`).then(response => {
      console.tron.info('ChaseDriver#callLambdaThumb', `${response.status} (${pocket_id})`)
      if (response.ok) {
        resolve()
      }
    }, err => {
      reject()
    })
  })
}

async function _loadEntriesFromStorage() {
  // console.tron.info('ChaseDriver#_loadEntriesFromStorage -- start')
  const entries = await global.storage.load({ key: 'entries' })
    .then(entries => {
      return entries
    }).catch(e => {
      return {}
    })
  // console.tron.info('ChaseDriver#_loadEntriesFromStorage -- done', entries)
  return entries
}

async function _convertItemToEntry(item) {
  const url = item.resolved_url ? item.resolved_url : item.given_url
  const isHTTPS = url.startsWith('https')
  const isHTTP  = url.startsWith('http:')
  let pageinfo = {}
  if (isHTTPS) {
    const libra = new Libra(url)
    pageinfo = await libra.getData().then(data => data).catch(e => {})
    // console.tron.info('ChaseDriver#Libra', pageinfo)
  }
  else if (isHTTP) {
    pageinfo = await fetch(`${CHASE_API_ENDPOINT}/info?url=${url}`, {
        method: 'GET',
      }).then((response) => {
        if (response.ok) {
          // console.tron.info('ChaseDriver#FetchDone!', url)
          return response.json()
        } else {
          return {}
        }
      }).catch(e => {
        return {}
      })
    // console.tron.info('ChaseDriver#[Lambda/info]', {url, pageinfo})
  }
  const entry = _mergeItemAndPageinfo(url, item, pageinfo)
  // console.tron.info('ChaseDriver# -- New Entry:', entry)
  return entry
}

function _mergeItemAndPageinfo(url, m, pi) {
  pi = pi || {}
  return {
    eid: m.item_id,
    url: url,
    image: _buildImagePath(m.item_id),
    siteName: pi.site_name,
    title: _choiceText(m.title, pi.title),
    description: pi.description,
    fqdn: `${url}/`.match(/\/\/(.*?)\//)[1],
    sortId: m.sort_id,
    tags: m.tags,
    date: _getDate(m.time_added),
  }
}

function _choiceText(pkt, ogp) {
  return ogp ? ogp : pkt
}

function _getDate(time10) {
  const dt = new Date(time10 * 1000)
  const y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const d = dt.getDate()
  return `${y}.${m}.${d}`
}

function _buildImagePath(itemId) {
  const item10Id = `0000000000${itemId}`.substr(-10, 10)
  const itemId3 = item10Id.slice(0, 3)
  return `items/thumbs/${itemId3}/${item10Id}.jpg`
}
