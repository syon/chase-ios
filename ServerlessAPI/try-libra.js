const Libra = require('./libra')

const urls = []
urls.push('http://qiita.com/horike37/items/b295a91908fcfd4033a2')
urls.push('http://qiita.com/ryo0301/items/7f9fd8024987526cbc30')
urls.push('http://inokara.hateblo.jp/entry/2017/04/30/092304')
urls.push(
  'https://wix.github.io/react-native-navigation/#/screen-api?id=poptorootparams-'
)
urls.push('https://togetter.com/li/1105672')
urls.push('https://allabout.co.jp/gm/gc/469010/')
urls.push('http://anond.hatelabo.jp/20170429110724')
urls.push('http://internet.watch.impress.co.jp/docs/news/1055983.html')
urls.push('http://qiita.com/chanibarin/items/48d5f5946b1e6c97e379')
urls.push('http://gigazine.net/news/20170410-pix-dt350n/')
urls.push(
  'http://www.coconoodollblog.net/entry/2017/04/17/%E3%80%8C%E3%81%A7%E3%81%8D%E3%81%9F%EF%BC%81_%E3%83%AD%E3%83%95%E3%83%88%E3%82%92%E4%BD%9C%E3%82%8A%E3%81%BE%E3%81%97%E3%81%9F%E3%80%82%E2%91%A1%E3%80%8D%E6%97%A5%E6%9B%9C%E5%A4%A7%E5%B7%A5%E5%A5%B3'
)
urls.push('http://www.dtmstation.com/archives/51994323.html')
urls.push('http://www.itmedia.co.jp/news/articles/1704/07/news058.html')

urls.forEach((url) => {
  const libra = new Libra(url)
  libra.getData().then((data) => {
    console.log('=============================')
    console.log(data)
  })
})
