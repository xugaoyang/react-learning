import { createSlice } from '@reduxjs/toolkit'

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: '',
    userInfo: {},
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      state.token = ''
      state.userInfo = {}
    }
  },
})

const { setToken, setUserInfo, clearUserInfo } = userStore.actions
export { setToken, setUserInfo, clearUserInfo }
export default userStore.reducer
