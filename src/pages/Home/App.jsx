import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import {Button} from 'antd'

function App() {
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
      </div>
    </div>
  )
}

export default App
