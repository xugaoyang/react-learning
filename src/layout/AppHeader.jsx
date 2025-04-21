import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Layout, theme, Button, Popconfirm } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, LoginOutlined } from '@ant-design/icons'
import { getUserApi } from '@/apis/user'
import { setUserInfo, clearUserInfo } from '@/store/modules/user'
import { setIsCollapse } from '@/store/modules/setting'

const { Header } = Layout

function AppHeader() {
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.user)
  const { isCollapse } = useSelector((state) => state.setting)
  const dispatch = useDispatch()
  const getUserFn = async () => {
    const res = await getUserApi()
    dispatch(setUserInfo(res.data))
  }
  useEffect(() => {
    getUserFn()
  }, [])
  const confirmLogout = () => {
    // 清除用户信息；进入登录
    dispatch(clearUserInfo())
    navigate('/login')
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Header style={{ padding: 0, background: colorBgContainer }} className="flex justify-between">
      <Button
        type="text"
        icon={isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => dispatch(setIsCollapse(!isCollapse))}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <div className="flex justify-center items-center text-[20px]">
        <img className="w-[20px] h-[20px] rounded-full mr-[10px]" src={userInfo.photo} alt="" />
        <span className="mr-[10px]">{userInfo.name}</span>
        <Popconfirm
          placement="left"
          description="是否退出登录?"
          onConfirm={confirmLogout}
          okText="是"
          cancelText="否"
        >
          <LoginOutlined className="mr-[10px] cursor-pointer" />
        </Popconfirm>
      </div>
    </Header>
  )
}

export default AppHeader
