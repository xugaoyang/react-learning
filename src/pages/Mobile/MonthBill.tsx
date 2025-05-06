import { useState } from 'react';
import { DatetimePicker, Field, Space, Collapse } from 'react-vant';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBillList } from '@/store/modules/bill';
import { billListApi } from '@/apis/bill';
import dayjs from 'dayjs';

function MonthBill() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const yearMonthDate = `${currentDate.getFullYear()} - ${currentDate.getMonth()}月`;
  const { billList } = useSelector(state => state.bill);
  const dispatch = useDispatch();
  useEffect(() => {
    const getBillList = async () => {
      const res = await billListApi();
      console.log('json-server res', res);
      dispatch(setBillList(res));
    };
    getBillList();
  }, []);

  return (
    <>
      <div className="bg-yellow-400 h-full rounded">
        <div>{yearMonthDate}账单</div>
        <Space>
          <div>
            <p>支出</p>
            <span>180.00</span>
          </div>
          <div>
            <p>收入</p>
            <span>180.00</span>
          </div>
          <div>
            <p>结余</p>
            <span>180.00</span>
          </div>
        </Space>
      </div>
      <Collapse>
        {billList.map(item => (
          <Collapse.Item
            title={dayjs(item.date).format('MM月DD日')}
            name={item.id}
          >
            {item.value}
          </Collapse.Item>
        ))}
      </Collapse>
    </>
  );
}

export default MonthBill;
