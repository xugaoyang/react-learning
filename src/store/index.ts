import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import counterReducer from './modules/counter'
import channelReducer from './modules/channel'
import userReducer from './modules/user'
import settingReducer from './modules/setting'

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducers = combineReducers({
  counter: counterReducer,
  channel: channelReducer,
  user: userReducer,
  setting: settingReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ['persist/PERSIST'],
      },
    }),
})

const persistor = persistStore(store)
export { store, persistor }
