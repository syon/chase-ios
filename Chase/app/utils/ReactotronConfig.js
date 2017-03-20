import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import { HOST_ADDR } from 'react-native-dotenv'

if (__DEV__) {
  Reactotron
    .configure({
      host: HOST_ADDR,
      name: 'Chase',
    })
    .use(reactotronRedux())
    .connect()

  console.tron = Reactotron
  Reactotron.clear()
}
