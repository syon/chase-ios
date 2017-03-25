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
  new Promise.all(
    Object.keys(icons).map(iconName =>
    // IconName--suffix--other-suffix is just the mapping name in iconsMap
    Ionicons.getImageSource(
    iconName.replace(replaceSuffixPattern, ''),
    icons[iconName][0],
    icons[iconName][1]
    ))
  ).then(sources => {
    Object.keys(icons)
    .forEach((iconName, idx) => (iconsMap[iconName] = sources[idx]))

    // Call resolve (and we are done)
    resolve(true)
  })
})

export {
  iconsMap,
  iconsLoaded
}
