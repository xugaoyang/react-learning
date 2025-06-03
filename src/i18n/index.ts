import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入语言包
import commonZh from '../locales/zh-CN/common.json';
import commonEn from '../locales/en-US/common.json';
import articleZh from '../locales/zh-CN/article.json';
import articleEn from '../locales/en-US/article.json';


const resources = {
  'zh-CN': {
    common: commonZh,
    article: articleZh,
  },
  'en-US': {
    common: commonEn,
    article: articleEn,
  },
};

i18n
  .use(LanguageDetector) // 自动检测浏览器语言
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh-CN', // 默认语言
    ns: ['common', 'article'], // 命名空间
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React 已经处理了 XSS
    },
  });

export default i18n;


import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

export {
  zhCN,
  enUS
}
