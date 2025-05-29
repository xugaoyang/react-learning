import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Tabbar } from 'react-vant';
import { setTabName } from '@/store/modules/bill';
import type { RootState } from '@/store';
import './bill.scss'

function Bill() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { tabName } = useSelector((state: RootState) => state.bill);
  
  useEffect(() => {
    dispatch(setTabName(location.pathname));
  }, [location.pathname]);

  const tabChange = (name: string) => {
    dispatch(setTabName(name));
  };

  return (
    <div id="bill" className="p-2">
      <div className="bill-content">
        <Outlet />
      </div>
      <Tabbar value={tabName} onChange={v => tabChange(v as string)}>
        <Tabbar.Item
          name="/bill/year"
          icon={<Link to="/bill/year"><span className="i-mdi-calendar-month"></span></Link>}
        >
          year
        </Tabbar.Item>
        <Tabbar.Item
          name="/bill/add"
          icon={<Link to="/bill/add"><span className="i-mdi-plus-box"></span></Link>}
        >
          add
        </Tabbar.Item>
        <Tabbar.Item
          name="/bill/month"
          icon={<Link to="/bill/month"><span className="i-mdi-calendar"></span></Link>}
        >
          month
        </Tabbar.Item>
      </Tabbar>
    </div>
  );
}

export default Bill;
