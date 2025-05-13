import { useState, useMemo, useEffect } from 'react';
import { DatetimePicker, Space, Popup } from 'react-vant';
import { useSelector, useDispatch } from 'react-redux';
import { setBillList } from '@/store/modules/bill';
import type { RootState } from '@/store';
import type { Bill } from '@/store/modules/bill';
import { billListApi } from '@/apis/bill';
import dayjs from 'dayjs';
import { sortBy, groupBy, forIn, sumBy } from 'lodash-es';
import BillDay from './components/BillDay';

interface DayData {
  date: string;
  paySum: number;
  incomeSum: number;
  children: Bill[];
}

function MonthBill() {
  const [currentYearMonthDate, setCurrentYearMonthDate] = useState(
    dayjs(new Date()).format('YYYY-MM'),
  );
  const { billList } = useSelector((state: RootState) => state.bill);
  const dispatch = useDispatch();
  const [datePickerShow, setDatePickerShow] = useState(false);
  const datePickerChange = (val: Date) => {
    setCurrentYearMonthDate(dayjs(val).format('YYYY-MM'));
    setDatePickerShow(false);
  };

  useEffect(() => {
    const getBillList = async () => {
      const data = await billListApi();
      dispatch(setBillList(data));
    };
    if (billList && billList.length === 0) {
      getBillList();
    }
  }, [dispatch, billList]);
  const groupdata = useMemo(() => {
    return groupBy(billList, val =>
      dayjs(val.date).format('YYYY-MM').toString(),
    );
  }, [billList]);
  const currentMonthData = useMemo(() => {
    const data = groupdata[currentYearMonthDate] || [];
    const paySum = sumBy(
      data.filter(val => val.type === 'pay'),
      'value',
    );
    const incomeSum = sumBy(
      data.filter(val => val.type === 'income'),
      'value',
    );
    return {
      date: currentYearMonthDate,
      paySum,
      incomeSum,
      children: data,
    };
  }, [currentYearMonthDate, groupdata]);
  const dayData = useMemo(() => {
    const dayDataArr: DayData[] = [];
    const data = groupBy(currentMonthData.children, val =>
      dayjs(val.date).format('YYYY-MM-DD').toString(),
    );
    forIn(data, (val, key) => {
      const paySum = sumBy(
        val.filter(v => v.type === 'pay'),
        'value',
      );
      const incomeSum = sumBy(
        val.filter(v => v.type === 'income'),
        'value',
      );
      dayDataArr.push({
        date: key,
        paySum,
        incomeSum,
        children: val,
      });
    });
    return sortBy(dayDataArr, ['date']);
  }, [currentMonthData]);
  return (
    <>
      {/* TODO:uno预设的tailwind4没有兼容背景渐变，导致失效，需要找方法处理 */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded p-2">
        <div className="p-2">
          <span className="mr-2">{currentYearMonthDate}</span>账单
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
            onConfirm={(value: Date) => datePickerChange(value)}
            onCancel={() => setDatePickerShow(false)}
          />
        </Popup>
        <Space gap={60} className="flex justify-between p-2">
          <div>
            <p className="flex items-center text-pink-500">
              <span className="i-mdi-checkbook-arrow-right mr-1"></span>支出
            </p>
            <span className="text-pink-500 text-xl">
              {currentMonthData.paySum.toFixed(2)}
            </span>
          </div>
          <div>
            <p className="flex items-center text-green-500">
              <span className="i-mdi-checkbook-arrow-left  mr-1"></span>收入
            </p>
            <span className="text-green-500 text-xl">
              {currentMonthData.incomeSum.toFixed(2)}
            </span>
          </div>
          <div>
            <p className="flex items-center text-blue-500">
              <span className="i-mdi-piggy-bank-outline  mr-1"></span>结余
            </p>
            <span className="text-xl text-blue-500">
              {(currentMonthData.incomeSum - currentMonthData.paySum).toFixed(
                2,
              )}
            </span>
          </div>
        </Space>
      </div>
      {dayData.map(item => (
        <BillDay billDayData={item} key={item.date}></BillDay>
      ))}
    </>
  );
}

export default MonthBill;
