import { useState, useMemo, useEffect } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import type { DatePickerProps } from 'antd';
import { Button, DatePicker, Space } from 'antd';

function Home() {
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
    </div>
  )
}

export default Home
