import { createSlice } from '@reduxjs/toolkit'

const settingStore = createSlice({
  name: 'setting',
  initialState: {
    isCollapse: false,
    menuDefaultKey: '/',
  },
  reducers: {
    setIsCollapse(state, action) {
      state.isCollapse = action.payload
    },
    setMenuDefaultKey(state, action) {
      state.menuDefaultKey = action.payload
    }
  },
})

const { setIsCollapse, setMenuDefaultKey } = settingStore.actions
export { setIsCollapse, setMenuDefaultKey }
export default settingStore.reducer
