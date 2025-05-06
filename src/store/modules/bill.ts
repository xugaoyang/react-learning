import { createSlice } from '@reduxjs/toolkit';

const billStore = createSlice({
  name: 'bill',
  initialState: {
    tabName: '/bill/year',
    billList: [],
  },
  reducers: {
    setTabName(state, action) {
      state.tabName = action.payload;
    },
    setBillList(state, action) {
      state.billList = action.payload;
    },
  },
});

const { setBillList, setTabName } = billStore.actions;
export { setBillList, setTabName };
export default billStore.reducer;
