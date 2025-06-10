import { createSlice } from '@reduxjs/toolkit';
import type { styleSettingType, SettingState } from '@/types/setting';

const initialState = {
  isCollapse: false,
  menuDefaultKey: '/',
  defaultLang: 'zh-CN',
  defaultTheme: 'light',
  isSettingOpen: false,
  styleSetting: {
    themeColor: '#1677ff',
    sideColor: '#1677ff',
    headerColor: '#ffffff',
    layoutStyle: 'withSide'
  } as styleSettingType
} as SettingState

const settingStore = createSlice({
  name: 'setting',
  initialState,
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
    setIsSettingOpen(state, action) {
      state.isSettingOpen = action.payload;
    },
    setStyleSetting(state, action: { payload: Partial<styleSettingType> }) {
      state.styleSetting = { ...state.styleSetting, ...action.payload };
    },
    resetstyleSetting(state) {
      state.styleSetting = { ...state.styleSetting, ...initialState.styleSetting };
    }
  },
});

const { setIsCollapse, setMenuDefaultKey, setDefaultLang, setDefaultTheme, setIsSettingOpen, setStyleSetting, resetstyleSetting } =
  settingStore.actions;
export { setIsCollapse, setMenuDefaultKey, setDefaultLang, setDefaultTheme, setIsSettingOpen, setStyleSetting, resetstyleSetting };
export default settingStore.reducer;
