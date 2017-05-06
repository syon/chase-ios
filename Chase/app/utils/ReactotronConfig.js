import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

class MyTron {
  static log(msg) {
    if (!__DEV__) { return }
    console.info(msg)
    Reactotron.log(msg)
  }
  
  static display(obj) {
    if (!__DEV__) { return }
    Reactotron.display(obj)
  }

  static start(label, obj) {
    if (!__DEV__) { return }
    console.log(`>>>>>>>> ${label} >>>>>>>>>>>>>>>>>>>>>>>>>>>>`)
    console.info(obj)
    Reactotron.display({
      name: label,
      preview: 'START',
      value: obj,
    })
  }

  static end(label, obj) {
    if (!__DEV__) { return }
    console.info(obj)
    console.log(`<<<<<<<<<<<<<<<<<<<<<<<<<<<< ${label} <<<<<<<<`)
    Reactotron.display({
      name: label,
      preview: 'END',
      value: obj,
    })
  }

  static tmp(label, obj) {
    if (!__DEV__) { return }
    console.log(`★★ ${label} ★★★★★★★★★★★★★★★★★★★★★★★★★★★★`)
    console.log(obj)
    console.log(`★★★★★★★★★★★★★★★★★★★★★★★★★★★★ ${label} ★★`)
    Reactotron.display({
      name: label,
      preview: 'TMP',
      value: obj,
    })
  }

  static info(label, obj) {
    if (!__DEV__) { return }
    console.info(label, obj)
    Reactotron.display({
      name: label,
      preview: 'INFO',
      value: obj,
    })
  }

  static warn(label, obj) {
    if (!__DEV__) { return }
    console.warn(label, obj)
    Reactotron.display({
      name: 'WARN',
      preview: label,
      value: obj,
      important: true
    })
  }

  static error(label, obj) {
    if (!__DEV__) { return }
    console.error(label, obj)
    Reactotron.display({
      name: 'ERROR',
      preview: label,
      value: obj,
      important: true
    })
  }
}

// Required both of Development & Production.
// Because of logging line still remains on Release.
console.tron = MyTron

if (__DEV__) {
  Reactotron
    .configure({
      name: 'Chase',
    })
    .use(reactotronRedux())
    .connect()

  Reactotron.clear()
}
