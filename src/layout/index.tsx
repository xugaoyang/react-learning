import { Outlet } from 'react-router-dom'
import { Layout,  theme } from 'antd'
import reactLogo from '@/assets/react.svg'
import AppHeader from './AppHeader'
import MenuWithRoute from './Menu'
import { useSelector } from 'react-redux'


const { Sider, Content } = Layout

function AppLayout() {
  const { isCollapse } = useSelector((state:any) => state.setting)
  const {
    token: { borderRadiusLG, colorBgContainer },
  } = theme.useToken()

  return (
    <Layout className="w-full h-full">
      <Sider trigger={null} collapsible collapsed={isCollapse}>
        <div className="h-[64px] flex justify-center items-center">
          <img src={reactLogo} alt="" />
        </div>
        <MenuWithRoute />
      </Sider>
      <Layout>
        <AppHeader />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
