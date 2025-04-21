import React, { useState } from 'react'
import { useNavigate, Outlet } from 'react-router'
import { UploadOutlined, UserOutlined, VideoCameraOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import reactLogo from '@/assets/react.svg'
import AppHeader from './AppHeader'
import { useSelector, useDispatch } from 'react-redux'
import { setMenuDefaultKey } from '@/store/modules/setting'

const { Sider, Content } = Layout

function AppLayout() {
  const { isCollapse, menuDefaultKey } = useSelector((state) => state.setting)
  const dispatch = useDispatch()
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
    dispatch(setMenuDefaultKey(e.key))
    navigate(e.key)
  }
  return (
    <Layout className="w-full h-full">
      <Sider trigger={null} collapsible collapsed={isCollapse}>
        <div className="h-[64px] flex justify-center items-center">
          <img src={reactLogo} alt="" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[menuDefaultKey]}
          items={items}
          onClick={onClick}
        />
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
