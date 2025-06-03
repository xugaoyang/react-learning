import { useState, useMemo, useEffect } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import type { DatePickerProps } from 'antd';
import { Button, DatePicker, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';

function Home() {
  const { i18n, t } = useTranslation(['common', 'article']);
  // 设置 dayjs 的语言
  dayjs.locale(i18n.language.toLowerCase());

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  }
  const [count, setCount] = useState(0)
  const res = useMemo(() => {
    console.log('useMemo count', count)
    return count + 1
  }, [count])
  useEffect(() => {
    setTimeout(() => {
      console.log('useEffect count', count)
      setCount(3)
    }, 1000)
  }, [count])
  return (
    <div>
      <div className="flex">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        <Button type="primary">antd按钮</Button>
        <DatePicker onChange={onChange} />
      </div>
      <div>
        <h1>{t('article:title')}</h1>
        <button>{t('common:buttons.detail')}</button>
      </div>
    </div>
  )
}

export default Home
