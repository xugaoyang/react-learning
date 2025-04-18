import React, { useState } from 'react'
import { useNavigate, Outlet } from 'react-router'
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MailOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import reactLogo from '@/assets/react.svg'
import AppHeader from './AppHeader'

const { Sider, Content } = Layout

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { borderRadiusLG, colorBgContainer },
  } = theme.useToken()
  const navigate = useNavigate()
  const items = [
    {
      key: '/',
      label: 'home',
      icon: <UploadOutlined />,
    },
    {
      key: '/counter',
      label: 'counter',
      icon: <UserOutlined />,
    },
    {
      key: '/channel',
      label: 'channel',
      icon: <VideoCameraOutlined />,
    },
    {
      key: '/article',
      label: 'article',
      icon: <MailOutlined />,
    },
  ]
  const onClick = (e) => {
    console.log('点击菜单', e)
    navigate(e.key)
  }
  return (
    <Layout className="w-full h-full">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="h-[64px] flex justify-center items-center">
          <img src={reactLogo} alt="" />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']} items={items} onClick={onClick} />
      </Sider>
      <Layout>
        <AppHeader setCollapsed={setCollapsed} collapsed={collapsed}/>
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
