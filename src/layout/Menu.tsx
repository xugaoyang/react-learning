import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UploadOutlined, UserOutlined, VideoCameraOutlined, MailOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { setMenuDefaultKey } from '@/store/modules/setting'

function MenuWithRoute() {
    const location = useLocation();
    const { menuDefaultKey } = useSelector((state: any) => state.setting)
    const dispatch = useDispatch()

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
    useEffect(() => {
        const currentPath = location.pathname
        dispatch(setMenuDefaultKey(currentPath))
    }, [location.pathname, dispatch])

    const onClick = (e: any) => {
        console.log('点击菜单', e)
        dispatch(setMenuDefaultKey(e.key))
    }

    return (
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[menuDefaultKey]}
            items={items}
            onClick={onClick}
        />
    )
}

export default MenuWithRoute
