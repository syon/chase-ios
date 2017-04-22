import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import { HOST_ADDR } from 'react-native-dotenv'

class MyTron {
  static log(msg) {
    Reactotron.log(msg)
  }
  
  static display(obj) {
    Reactotron.display(obj)
  }

  static start(label, obj) {
    Reactotron.display({
      name: label,
      preview: 'START',
      value: obj,
    })
  }

  static info(label, obj) {
    Reactotron.display({
      name: label,
      preview: 'INFO',
      value: obj,
    })
  }

  static error(label, obj) {
    Reactotron.display({
      name: 'ERROR',
      preview: label,
      value: obj,
      important: true
    })
  }
}

if (__DEV__) {
  Reactotron
    .configure({
      host: HOST_ADDR,
      name: 'Chase',
    })
    .use(reactotronRedux())
    .connect()

  console.tron = MyTron
  Reactotron.clear()
}
