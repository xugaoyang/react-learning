import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import type { DatePickerProps } from 'antd';
import { Button, DatePicker, Space } from 'antd';

function Home() {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  }
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
