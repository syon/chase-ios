let catalogBySort = {}

export function makeCatalog(listFromPocket) {
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
      tags: m.tags
    }
    catalogBySort[m.sort_id] = itemId
  })
  return catalog
}

export async function saveCatalogItemsAsEntryToStorage(catalog) {
  console.tron.info('ChaseDriver#saveCatalogItemsAsEntryToStorage -- catalog', catalog)
  const entries = await _loadEntriesFromStorage()
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
  console.tron.info('ChaseDriver#_loadEntriesFromStorage')
  const entries = await global.storage.load({ key: 'entries' })
    .then(entries => {
      return entries
    }).catch(e => {
      console.tron.info('ChaseDriver#_loadEntriesFromStorage -- catch', e)
      switch (e.name) {
        case 'NotFoundError':
          break
        default:
      }
      return {}
    })
  return entries
}

async function _convertItemToEntry(item) {
  // console.tron.info('ChaseDriver#FetchingPageInfo...', item.url)
  const endpoint = 'https://uysa8o7cq6.execute-api.us-east-1.amazonaws.com/prod'
  const pageinfo = await fetch(`${endpoint}/?url=${item.url}`, {
      method: 'GET',
    }).then((response) => {
      if (response.ok) {
        // console.tron.info('ChaseDriver#FetchDone!', item.url)
        return response.json()
      } else {
        throw response
      }
    }).then(pageinfo => {
      return pageinfo
    }).catch((error) => {
      throw error
    })
  const entry = _mergeItemAndPageinfo(item, pageinfo)
  // console.tron.info('ChaseDriver#Entry', entry)
  return entry
}

function _mergeItemAndPageinfo(item, pageinfo) {
  pageinfo = pageinfo || {}
  return {
    eid: item.itemId,
    url: item.url,
    siteName: pageinfo.site_name,
    title: _choiceText(item.title, pageinfo.title),
    description: pageinfo.description,
    fqdn: item.fqdn,
    sortId: item.sort_id,
    tags: item.tags
  }
}

function _choiceText(pkt, ogp) {
  return ogp ? ogp : pkt
}
