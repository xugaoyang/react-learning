import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counter'
import channelReducer from './modules/channel'
import userReducer from './modules/user'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    channel: channelReducer,
    user: userReducer
  },
})

export default store
