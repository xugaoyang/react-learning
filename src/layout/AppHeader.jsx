import { useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { Layout, theme, Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, LoginOutlined } from '@ant-design/icons'
import {getUser} from '@/apis/user'
import { setUserInfo } from '@/store/modules/user'

const { Header } = Layout

function AppHeader({ setCollapsed, collapsed }) {
  const { userInfo } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const getUserFn = async () => {
    const res = await getUser()
    console.log(res)
    dispatch(setUserInfo(res.data))
  }
  useEffect(() => {
    getUserFn()
  }, [])
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Header style={{ padding: 0, background: colorBgContainer }} className="flex justify-between">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <div className="flex justify-center items-center">
        <img className="w-[20px] h-[20px] rounded-full mr-[5px]" src={userInfo.photo} alt="" />
        <span className="mr-[5px]">{userInfo.name}</span>
        <LoginOutlined className="mr-[5px] cursor-pointer" />
      </div>
    </Header>
  )
}

export default AppHeader
