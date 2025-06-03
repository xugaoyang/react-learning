import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import type { Language } from './antd-locale';

export const updateDayjsLocale = (language: Language) => {
  dayjs.locale(language.toLowerCase());
}; 