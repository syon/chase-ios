/* https://github.com/junedomingo/movieapp/blob/master/src/app.ios.js */
import Ionicons from 'react-native-vector-icons/Ionicons'

const replaceSuffixPattern = /--(active|big|small|very-big)/g
const icons = {
  'ios-filing-outline': [30],
  'ios-filing': [30],
  'ios-glasses-outline': [30],
  'ios-glasses': [30],
  'ios-pricetags-outline': [30],
  'ios-pricetags': [30],
  'ios-options-outline': [30],
  'ios-options': [30],
}

const iconsMap = {}
const iconsLoaded = new Promise((resolve, reject) => {
  const isrc = Object.keys(icons).map(iNm => {
    // IconName--suffix--other-suffix is just the mapping name in iconsMap
    const arg = iNm.replace(replaceSuffixPattern, '')
    return Ionicons.getImageSource(arg, icons[iNm][0], icons[iNm][1])
  })
  Promise.all(isrc)
    .then(sources => {
      Object.keys(icons).forEach((iNm, idx) => (iconsMap[iNm] = sources[idx]))
      // Call resolve (and we are done)
      resolve(true)
    }).catch(reject)
})

export {
  iconsMap,
  iconsLoaded,
}
