let catalogBySort = {}

import Libra from './LibraAPI'

export function makeCatalog(listFromPocket) {
  // console.tron.info('ChaseDriver#makeCatalog -- listFromPocket', listFromPocket)
  let catalog = {}
  Object.keys(listFromPocket).forEach((key) => {
    const m = listFromPocket[key]
    itemId = m.resolved_id == "0" ? m.item_id : m.resolved_id
    const url = m.resolved_url ? m.resolved_url : m.given_url
    const fqdn = `${url}/`.match(/\/\/(.*?)\//)[1]
    catalog[key] = {
      key: itemId,
      itemId: itemId,
      title: m.resolved_title ? m.resolved_title : m.given_title,
      url: url,
      fqdn: fqdn,
      sortId: m.sort_id,
      tags: m.tags,
      time_added: m.time_added
    }
    catalogBySort[m.sort_id] = itemId
  })
  return catalog
}

export async function saveCatalogItemsAsEntryToStorage(catalog) {
  // console.tron.info('ChaseDriver#saveCatalogItemsAsEntryToStorage -- catalog', catalog)
  let entries = await _loadEntriesFromStorage()
  const promises = []
  Object.keys(catalog).forEach(itemId => {
    const item = catalog[itemId]
    const existEntry = entries[itemId]
    if (!existEntry) {
      promises.push(_convertItemToEntry(item))
    }
  })
  await Promise.all(promises).then(values => {
    console.tron.info('ChaseDriver#Promise.all Done!', values)
    values.forEach(v => { entries[v.eid] = v })
    global.storage.save({ key: 'entries', rawData: entries, expires: null })
  })
  return entries
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
  const isHTTPS = item.url.startsWith('https')
  let pageinfo = {}
  if (isHTTPS) {
    const libra = new Libra(item.url)
    pageinfo = await libra.getData().then(data => data).catch(e => {})
  } else {
    const endpoint = 'https://uysa8o7cq6.execute-api.us-east-1.amazonaws.com/prod'
    pageinfo = await fetch(`${endpoint}/?url=${item.url}`, {
        method: 'GET',
      }).then((response) => {
        if (response.ok) {
          // console.tron.info('ChaseDriver#FetchDone!', item.url)
          return response.json()
        } else {
          return {}
        }
      }).catch(e => {
        return {}
      })
  }
  const entry = _mergeItemAndPageinfo(item, pageinfo)
  // console.tron.info('ChaseDriver# -- New Entry:', entry)
  return entry
}

function _mergeItemAndPageinfo(item, pageinfo) {
  if (!item) {
    console.tron.warn('ITEM NOT FOUND', item)
  }
  pageinfo = pageinfo || {}
  return {
    eid: item.itemId,
    url: item.url,
    siteName: pageinfo.site_name,
    title: _choiceText(item.title, pageinfo.title),
    description: pageinfo.description,
    fqdn: item.fqdn,
    sortId: item.sort_id,
    tags: item.tags,
    date: _getDate(item.time_added),
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
