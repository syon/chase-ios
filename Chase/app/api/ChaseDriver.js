let catalogBySort = {}

import Libra from './LibraAPI'

export const CHASE_API_ENDPOINT = 'https://uysa8o7cq6.execute-api.us-east-1.amazonaws.com/prod'
export const CHASE_THUMBS_CF_PATH = 'https://d2aed4ktvx51jm.cloudfront.net'
export const CHASE_THUMBS_S3_PATH = 'https://s3.amazonaws.com/syon-chase'

export function makeCatalog(listFromPocket) {
  // console.tron.start('ChaseDriver#makeCatalog -- listFromPocket:', listFromPocket)
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
  // console.tron.end('ChaseDriver#makeCatalog -- catalog:', catalog)
  return { catalog, rawItems }
}

export function makeSceneCatalog(listFromPocket) {
  // console.tron.start('ChaseDriver#makeSceneCatalog -- listFromPocket:', listFromPocket)
  let catalog = {}
  let rawItems = {}
  let arr = convertHashToArray(listFromPocket)
  arr = arr.filter(d => {
    const userTags = Object.keys(d.tags).filter(t => {
      return !t.match(/chase:(a|b|c)/)
    })
    return !userTags.length
  })
  const hash = convertArrayToHash(arr, 'item_id')
  Object.keys(hash).forEach((key) => {
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
  // console.tron.end('ChaseDriver#makeSceneCatalog -- catalog:', catalog)
  return { catalog, rawItems }
}

function convertHashToArray(hash) {
  let array = []
  if (!hash) { return array }
  Object.keys(hash).forEach((key) => {
    array.push(hash[key])
  })
  return array
}

function convertArrayToHash(array, key) {
  let hash = {}
  if (!array) { return hash }
  array.forEach(d => {
    hash[d[key]] = d
  })
  return hash
}

export async function saveCatalogItemsAsEntryToStorage(rawItems) {
  // console.tron.info('ChaseDriver#saveCatalogItemsAsEntryToStorage -- rawItems', rawItems)
  let entries = await _loadEntriesFromStorage()
  const promises = []
  Object.keys(rawItems).forEach(itemId => {
    const item = rawItems[itemId]
    const existEntry = entries[itemId]
    promises.push(_convertItemToEntry(item, existEntry))
  })
  await Promise.all(promises).then(values => {
    // console.tron.info('ChaseDriver#Promise.all Done!', values)
    values.forEach(v => { entries[v.eid] = v })
    // console.tron.info('ChaseDriver# -- NewEntries:', entries)
    global.storage.save({ key: 'entries', data: entries, expires: null })
  })
  return entries
}

export function callLambdaThumb(url, pocket_id, image_suggested) {
  return new Promise((resolve, reject) => {
    const qs = `url=${url}&pocket_id=${pocket_id}&suggested=${image_suggested}`
    console.tron.start('ChaseDriver#callLambdaThumb request qs:', qs)
    fetch(`${CHASE_API_ENDPOINT}/thumb?${qs}`).then(response => {
      console.tron.end('ChaseDriver#callLambdaThumb response:', `${response.status} (${pocket_id})`)
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

async function _convertItemToEntry(item, existEntry) {
  const url = item.resolved_url ? item.resolved_url : item.given_url
  const isHTTPS = url.startsWith('https')
  const isHTTP  = url.startsWith('http:')
  let pageinfo = {}
  if (!existEntry) {
    if (isHTTPS) {
      const libra = new Libra(url)
      pageinfo = await libra.getData().then(data => data).catch(e => {})
      console.tron.info('ChaseDriver#Libra', pageinfo)
    }
    else if (isHTTP) {
      pageinfo = await fetch(`${CHASE_API_ENDPOINT}/info?url=${url}`, {
          method: 'GET',
        }).then((response) => {
          if (response.ok) {
            console.tron.info('ChaseDriver#FetchDone!', url)
            return response.json()
          } else {
            return {}
          }
        }).catch(e => {
          return {}
        })
      // console.tron.info('ChaseDriver#[Lambda/info]', {url, pageinfo})
    }
  }
  const entry = _mergeItemAndPageinfo(existEntry, url, item, pageinfo)
  // console.tron.info('ChaseDriver# -- New Entry:', entry)
  return entry
}

function _mergeItemAndPageinfo(existEntry, url, m, pi) {
  pi = pi || {}
  if (existEntry) {
    existEntry['sortId'] = m.sort_id
    existEntry['tags'] = m.tags
    return existEntry
  } else {
    return {
      eid: m.item_id,
      url: url,
      image: _buildImagePath(m.item_id),
      image_suggested: (m.has_image === '1') ? m.image.src : '',
      siteName: pi.site_name,
      title: _choiceText(m.title, pi.title),
      description: pi.description,
      fqdn: `${url}/`.match(/\/\/(.*?)\//)[1],
      sortId: m.sort_id,
      tags: m.tags,
      date: _getDate(m.time_added),
    }
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
