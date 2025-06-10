import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import type { PopconfirmProps, MenuProps } from 'antd';
import { Layout, theme, Button, Popconfirm, Dropdown, Space } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { getUserApi } from '@/apis/mock/user';
import { setUserInfo, clearUserInfo } from '@/store/modules/user';
import {
  setIsCollapse,
  setDefaultLang,
  setDefaultTheme,
  setIsSettingOpen,
} from '@/store/modules/setting';
import { useTranslation } from 'react-i18next';
import type { Language } from '@/i18n/antd-locale';
import { updateDayjsLocale } from '@/i18n/dayjs-locale';
const { Header } = Layout;

function AppHeader() {
  const { i18n } = useTranslation();
  const { userInfo } = useSelector((state: any) => state.user);
  const { isCollapse, defaultLang, defaultTheme, styleSetting } = useSelector(
    (state: any) => state.setting,
  );
  const dispatch = useDispatch();
  const getUserFn = async () => {
    const res = await getUserApi();
    dispatch(setUserInfo(res.data));
  };
  useEffect(() => {
    getUserFn();
  }, []);
  const confirmLogout: PopconfirmProps['onConfirm'] = () => {
    // 清除用户信息
    dispatch(clearUserInfo());
  };

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
    dispatch(setDefaultTheme(key));
  };
  const langItems: MenuProps['items'] = [
    {
      key: 'zh-CN',
      label: <span>中</span>,
    },
    {
      key: 'en-US',
      label: <span>英</span>,
    },
  ];
  const langOnClick: MenuProps['onClick'] = ({ key }) => {

    dispatch(setDefaultLang(key));
    i18n.changeLanguage(key);
    updateDayjsLocale(key as Language);
  };
  return (
    <Header
      style={{ padding: 0, background: styleSetting.headerColor }}
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
        <i className="i-mdi-settings-outline icon-24 cursor-pointer" onClick={() => dispatch(setIsSettingOpen(true))}></i>
        <Dropdown
          menu={{
            items: themeItems,
            selectable: true,
            defaultSelectedKeys: [defaultTheme],
            onClick: themeOnClick,
          }}
          placement="bottom"
        >
          <span className="i-mdi-theme-light-dark icon-24 cursor-pointer"></span>
        </Dropdown>
        <Dropdown
          menu={{
            items: langItems,
            selectable: true,
            defaultSelectedKeys: [defaultLang],
            onClick: langOnClick,
          }}
          placement="bottom"
        >
          <span className="i-mdi-google-translate icon-24 cursor-pointer"></span>
        </Dropdown>
        <img
          className="w-[24px] h-[24px] rounded-full"
          src={userInfo.avatar}
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
          <Link to="/login">
            <LoginOutlined className="mr-[10px] cursor-pointer" />
          </Link>
        </Popconfirm>
      </Space>
    </Header>
  );
}

export default AppHeader;
