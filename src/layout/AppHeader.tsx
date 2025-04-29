import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { PopconfirmProps, MenuProps } from 'antd';
import { Layout, theme, Button, Popconfirm, Dropdown, Space } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { getUserApi } from '@/apis/user';
import { setUserInfo, clearUserInfo } from '@/store/modules/user';
import { setIsCollapse, setDefaultLang, setDefaultTheme} from '@/store/modules/setting';

const { Header } = Layout;

function AppHeader() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: any) => state.user);
  const { isCollapse } = useSelector((state: any) => state.setting);
  const dispatch = useDispatch();
  const getUserFn = async () => {
    const res = await getUserApi();
    dispatch(setUserInfo(res.data));
  };
  useEffect(() => {
    getUserFn();
  }, []);
  const confirmLogout: PopconfirmProps['onConfirm'] = () => {
    // 清除用户信息；进入登录
    dispatch(clearUserInfo());
    navigate('/login');
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const themeItems: MenuProps['items'] = [
    {
      key: 'light',
      label: <span>白</span>,
    },
    {
      key: 'dark',
      label: <span>暗</span>,
    },
  ];
  const themeOnClick: MenuProps['onClick'] = ({ key }) => {
    dispatch(setDefaultTheme(key))
  };
  const langItems: MenuProps['items'] = [
    {
      key: 'zh_CN',
      label: <span>中</span>,
    },
    {
      key: 'en_US',
      label: <span>英</span>,
    },
  ];
  const langOnClick: MenuProps['onClick'] = ({ key }) => {
    dispatch(setDefaultLang(key))
  };
  return (
    <Header
      style={{ padding: 0, background: colorBgContainer }}
      className="flex justify-between"
    >
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
      <Space className="text-[16px]">
        <Dropdown
          menu={{ items: themeItems, onClick: themeOnClick }}
          placement="bottom"
        >
          <span className="i-mdi-theme-light-dark icon-24"></span>
        </Dropdown>
        <Dropdown
          menu={{ items: langItems, onClick: langOnClick }}
          placement="bottom"
        >
          <span className="i-mdi-google-translate icon-24"></span>
        </Dropdown>
        <img
          className="w-[24px] h-[24px] rounded-full"
          src={userInfo.photo}
          alt=""
        />
        <span>{userInfo.name}</span>
        <Popconfirm
          title=""
          placement="left"
          description="是否退出登录?"
          onConfirm={confirmLogout}
          okText="是"
          cancelText="否"
        >
          <LoginOutlined className="mr-[10px] cursor-pointer" />
        </Popconfirm>
      </Space>
    </Header>
  );
}

export default AppHeader;
