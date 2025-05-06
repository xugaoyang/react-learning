import {useState} from "react"
import { useNavigate,Outlet } from 'react-router';
import { Tabbar } from 'react-vant';
function Bill() {
  const [defaultName, setDefaultName] = useState('/bill/year')
  const navigate = useNavigate()
  const tabChange = (name:string) => {
    setDefaultName(name)
    navigate(name)
  }
  return (
    <div className="p-2">
      <Outlet />
      <Tabbar value={defaultName} onChange={(v) => tabChange(v as string)}>
        <Tabbar.Item name="/bill/year"><span className="i-mdi-calendar-month"></span>year</Tabbar.Item>
        <Tabbar.Item name="/bill/add"><span className="i-mdi-plus-box"></span>add</Tabbar.Item>
        <Tabbar.Item name="/bill/month"><span className="i-mdi-calendar"></span>month</Tabbar.Item>
      </Tabbar>
    </div>
  );
}

export default Bill;
