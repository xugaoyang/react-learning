import { createSlice } from '@reduxjs/toolkit';

const settingStore = createSlice({
  name: 'setting',
  initialState: {
    isCollapse: false,
    menuDefaultKey: '/',
    defaultLang: 'zh-CN',
    defaultTheme: 'light',
  },
  reducers: {
    setIsCollapse(state, action) {
      state.isCollapse = action.payload;
    },
    setMenuDefaultKey(state, action) {
      state.menuDefaultKey = action.payload;
    },
    setDefaultLang(state, action) {
      state.defaultLang = action.payload;
    },
    setDefaultTheme(state, action) {
      state.defaultTheme = action.payload;
    },
  },
});

const { setIsCollapse, setMenuDefaultKey, setDefaultLang, setDefaultTheme } =
  settingStore.actions;
export { setIsCollapse, setMenuDefaultKey, setDefaultLang, setDefaultTheme };
export default settingStore.reducer;
