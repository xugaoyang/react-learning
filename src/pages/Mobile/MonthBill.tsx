import { useState } from 'react';
import { DatetimePicker, Field, Space, Collapse, Popup } from 'react-vant';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBillList } from '@/store/modules/bill';
import { billListApi } from '@/apis/bill';
import dayjs from 'dayjs';
import { sortBy, groupBy, forIn, sumBy } from 'lodash-es';

function MonthBill() {
  const [payMonth, setPayMonth] = useState(0);
  const [incomeMonth, setIncomeMonth] = useState(0);
  const [yearMonthDate, setYearMonthDate] = useState(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}月`,
  );
  const { billList } = useSelector(state => state.bill);
  const dispatch = useDispatch();
  const [datePickerShow, setDatePickerShow] = useState(false);
  const datePickerChange = val => {
    setYearMonthDate(dayjs(val).format('YYYY-MM'));
    setDatePickerShow(false);
  };
  useEffect(() => {
    const getBillList = async () => {
      const res = await billListApi();
      const paydata = res.filter(val => val.type === 'pay');
      const incomedata = res.filter(val => val.type === 'income');
      setPayMonth(sumBy(paydata, 'value'));
      setIncomeMonth(sumBy(incomedata, 'value'));
      const sortdata = sortBy(res, ['date']);
      let groupdata = [];
      forIn(
        groupBy(sortdata, val => dayjs(val.date).format('YYYY-MM-DD')),
        (val, key) => {
          groupdata.push({
            date: key,
            children: val,
          });
        },
      );
      dispatch(setBillList(groupdata));
    };
    getBillList();
  }, []);

  return (
    <>
      {/* TODO:uno预设的tailwind4没有兼容背景渐变，导致失效，需要找方法处理 */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded p-2">
        <div className="p-2">
          <span className="mr-2">{yearMonthDate}</span>账单
          {datePickerShow ? (
            <span className="i-mdi-menu-up text-xl"></span>
          ) : (
            <span
              className="i-mdi-menu-down text-xl"
              onClick={() => setDatePickerShow(true)}
            ></span>
          )}
        </div>
        <Popup
          visible={datePickerShow}
          style={{ height: '30%' }}
          position="bottom"
          onClose={() => setDatePickerShow(false)}
        >
          <DatetimePicker
            title="选择年月"
            type="year-month"
            minDate={new Date(2020, 0)}
            maxDate={new Date(2025, 10)}
            formatter={(type: string, val: string) => {
              if (type === 'year') {
                return `${val}年`;
              }
              if (type === 'month') {
                return `${val}月`;
              }
              return val;
            }}
            onConfirm={value => datePickerChange(value)}
            onCancel={() => setDatePickerShow(false)}
          />
        </Popup>
        <Space gap={60} className="flex justify-between p-2">
          <div>
            <p className="flex items-center text-pink-500">
              <span className="i-mdi-checkbook-arrow-right mr-1"></span>支出
            </p>
            <span className="text-pink-500 text-xl">{payMonth.toFixed(2)}</span>
          </div>
          <div>
            <p className="flex items-center text-green-500">
              <span className="i-mdi-checkbook-arrow-left  mr-1"></span>收入
            </p>
            <span className="text-green-500 text-xl">
              {incomeMonth.toFixed(2)}
            </span>
          </div>
          <div>
            <p className="flex items-center text-blue-500">
              <span className="i-mdi-piggy-bank-outline  mr-1"></span>结余
            </p>
            <span className="text-xl text-blue-500">
              {(incomeMonth - payMonth).toFixed(2)}
            </span>
          </div>
        </Space>
      </div>
      <Collapse>
        {billList.map(item => (
          <Collapse.Item title={item.date} name={item.date}>
            {item.children.map(child => (
              <div className="flex justify-between p-2" key={child.id}>
                <div className="flex justify-center items-baseline">
                  <span className={`i-${child.icon} bg-yellow-500 mr-1`}></span>
                  <span className="font-bold text-black mr-2">
                    {child.useFor}
                  </span>
                  <span className="text-xs">
                    {dayjs(child.date).format('HH:mm')}
                  </span>
                </div>
                {child.type === 'pay' ? (
                  <span className="font-bold text-pink-500 text-xl">
                    {child.value}
                  </span>
                ) : (
                  <span className="font-bold text-green-500 text-xl">
                    {child.value}
                  </span>
                )}
              </div>
            ))}
          </Collapse.Item>
        ))}
      </Collapse>
    </>
  );
}

export default MonthBill;
