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
  },
})

const { setToken, setUserInfo } = userStore.actions
export { setToken, setUserInfo }
export default userStore.reducer
