import { Locale } from 'antd/es/locale';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

export type Language = 'zh-CN' | 'en-US';

export const antdLocales: Record<Language, Locale> = {
    'zh-CN': zhCN,
    'en-US': enUS,
  };
  
  export const getAntdLocale = (language: Language): Locale => {
    return antdLocales[language] || zhCN;
  };
