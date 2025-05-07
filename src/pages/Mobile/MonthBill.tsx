import { useState } from 'react';
import { DatetimePicker, Field, Space, Collapse } from 'react-vant';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBillList } from '@/store/modules/bill';
import { billListApi } from '@/apis/bill';
import dayjs from 'dayjs';
import { sortBy, groupBy, forIn, sumBy } from 'lodash-es';

function MonthBill() {
  const [payMonth, setPayMonth] = useState(0);
  const [incomeMonth, setIncomeMonth] = useState(0);
  const yearMonthDate = `${new Date().getFullYear()} - ${new Date().getMonth() + 1}月`;
  const { billList } = useSelector(state => state.bill);
  const [value, setValue] = useState(new Date());
  const dispatch = useDispatch();
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
        {/* <div>{yearMonthDate}账单</div> */}
        <DatetimePicker
          popup={{
            round: true,
          }}
          type="year-month"
          title="选择年月"
          minDate={new Date(2021, 0, 1)}
          maxDate={new Date(2025, 10, 1)}
          value={value}
          onConfirm={setValue}
        >
          {(val, _, actions) => {
            return (
              <Field
                readOnly
                clickable
                value={dayjs(val).format('YYYY-MM')}
                placeholder="请选择年月"
                className="year-month-input bg-transparent!"
                onClick={() => actions.open()}
              />
            );
          }}
        </DatetimePicker>
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
                  <span
                    className={`i-${child.icon} bg-yellow-500 mr-1 text-xl`}
                  ></span>
                  <span className="font-bold text-black text-xl mr-2">
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
