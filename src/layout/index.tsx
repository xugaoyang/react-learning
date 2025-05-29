import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { UploadOutlined, UserOutlined, VideoCameraOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import reactLogo from '@/assets/react.svg'
import AppHeader from './AppHeader'
import { useSelector, useDispatch } from 'react-redux'
import { setMenuDefaultKey } from '@/store/modules/setting'

const { Sider, Content } = Layout

function AppLayout() {
  const { isCollapse, menuDefaultKey } = useSelector((state:any) => state.setting)
  const dispatch = useDispatch()
  const {
    token: { borderRadiusLG, colorBgContainer },
  } = theme.useToken()

  const items = [
    {
      key: '/',
      label: <Link to="/">home</Link>,
      icon: <UploadOutlined />,
    },
    {
      key: '/counter',
      label: <Link to="/counter">counter</Link>,
      icon: <UserOutlined />,
    },
    {
      key: '/channel',
      label: <Link to="/channel">channel</Link>,
      icon: <VideoCameraOutlined />,
    },
    {
      key: '/article',
      label: <Link to="/article">article</Link>,
      icon: <MailOutlined />,
    },
    {
      key: '/bill',
      label: <Link to="/bill">mobile-demo</Link>,
      icon: <MailOutlined />,
    },
  ]

  const onClick = (e:any) => {
    console.log('点击菜单', e)
    dispatch(setMenuDefaultKey(e.key))
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
