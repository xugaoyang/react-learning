import { useState, useMemo, useEffect } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import type { DatePickerProps, CalendarProps } from 'antd';
import { Button, DatePicker, Space, Calendar } from 'antd';
import { useTranslation } from 'react-i18next';
import type { Dayjs } from 'dayjs';

function Home() {
  const { t } = useTranslation(['common', 'article']);

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
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
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
        <Button type="primary">{t('common:welcome')}</Button>
        <DatePicker onChange={onChange} />
      </div>
      <div>
        国际化测试：
        <h1>{t('article:title')}</h1>
        <button>{t('common:buttons.detail')}</button>
      </div>
      <Calendar onPanelChange={onPanelChange} />
    </div>
  )
}

export default Home
