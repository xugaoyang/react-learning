import { createSlice } from '@reduxjs/toolkit';

export interface Bill {
  date: string;
  type: 'pay' | 'income';
  value: number;
  id: string | number;
  useFor: string;
  icon: string;
}

interface BillState {
  tabName: string;
  billList: Bill[];
}

const initialState: BillState = {
  tabName: '/bill/year',
  billList: [],
};

const billStore = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    setTabName(state, action: { payload: string }) {
      state.tabName = action.payload;
    },
    setBillList(state, action: { payload: Bill[] }) {
      state.billList = action.payload;
    },
  },
});

const { setBillList, setTabName } = billStore.actions;
export { setBillList, setTabName };
export default billStore.reducer;
