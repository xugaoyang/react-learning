import { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Tabbar } from 'react-vant';
import { setTabName } from '@/store/modules/bill';
function Bill() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { tabName } = useSelector(state => state.bill);
  dispatch(setTabName(location.pathname))
  const tabChange = (name: string) => {
    dispatch(setTabName(name));
    navigate(name);
  };
  return (
    <div className="p-2">
      <Outlet />
      <Tabbar value={tabName} onChange={v => tabChange(v as string)}>
        <Tabbar.Item name="/bill/year">
          <span className="i-mdi-calendar-month"></span>year
        </Tabbar.Item>
        <Tabbar.Item name="/bill/add">
          <span className="i-mdi-plus-box"></span>add
        </Tabbar.Item>
        <Tabbar.Item name="/bill/month">
          <span className="i-mdi-calendar"></span>month
        </Tabbar.Item>
      </Tabbar>
    </div>
  );
}

export default Bill;
