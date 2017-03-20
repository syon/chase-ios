import Reactotron from 'reactotron-react-native'
import { HOST_ADDR } from 'react-native-dotenv'

if (__DEV__) {
  Reactotron
    .configure({
      host: HOST_ADDR,
      name: 'Chase',
    })
    .connect()

  console.tron = Reactotron
  Reactotron.clear()
}
