export type styleSettingType = {
  themeColor: string
  sideColor: string
  headerColor: string
  layoutStyle: string
}

export type SettingState = {
  isCollapse: boolean
  menuDefaultKey: string
  defaultLang: string
  defaultTheme: string
  isSettingOpen: boolean
  styleSetting: styleSettingType
} 