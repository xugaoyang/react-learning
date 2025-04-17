import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const channelStore = createSlice({
  name: 'channel',
  initialState: {
    channelList: [],
  },
  reducers: {
    setChannel(state, action) {
      state.channelList = action.payload
    },
  },
})
const { setChannel } = channelStore.actions
const fetchChannelList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://geek.itheima.net/v1_0/channels')
    dispatch(setChannel(res.data.data.channels))
  }
}

export { fetchChannelList }

export default channelStore.reducer
