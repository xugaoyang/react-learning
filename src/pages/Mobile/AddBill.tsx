import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBillList } from '@/store/modules/bill';
import {
  Tabs,
  Card,
  Cell,
  Input,
  DatetimePicker,
  Popup,
  Button,
} from 'react-vant';
import { payIcons, incomeIcons } from './iconData';
import dayjs from 'dayjs';

interface IconType {
  type: string
  icon: string
  useFor: string
}

function AddBill() {
  const { billList } = useSelector(state => state.bill);
  const dispatch = useDispatch();
  const [num, setNum] = useState(0);
  const [commitDate, setCommitDate] = useState(
    dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
  );
  const [typeChoose, setTypeChoose] = useState<IconType>({
    type: '',
    icon: '',
    useFor: ''
  });
  const [datePickerShow, setDatePickerShow] = useState(false);
  const datePickerChange = v => {
    setCommitDate(dayjs(v).format('YYYY-MM-DD HH:mm:ss'));
    console.log(v, commitDate);
    setDatePickerShow(false);
  };
  const cancelCommit = () => {
    console.log('cancel');
  };
  const confirmCommit = () => {
    console.log('confirm', typeChoose);
    // 处理数据格式
    if(typeChoose) {
      const saveData = {
        id: new Date().getTime(),
        type: typeChoose.type,
        useFor: typeChoose.useFor,
        icon: typeChoose.icon,
        date: commitDate,
        value: ~~num,
      };
      console.log(typeChoose, saveData,billList, [...billList,saveData])
      dispatch(setBillList([...billList,saveData]))
    }

  };
  const iconClick = icon => {
    console.log(icon);
    setTypeChoose(icon);
  };
  const tabs = [
    {
      id: 1,
      name: '支出',
      type: 'pay',
    },
    {
      id: 2,
      name: '收入',
      type: 'income',
    },
  ];

  return (
    <>
      <Cell>
        <Input
          prefix={
            <i
              className="i-mdi-clock-edit-outline"
              onClick={() => setDatePickerShow(true)}
            ></i>
          }
          suffix={
            <>
              <Button type="default" onClick={() => cancelCommit()}>
                取消
              </Button>
              <Button type="primary" onClick={() => confirmCommit()}>
                保存
              </Button>
            </>
          }
          type="number"
          value={num}
          onChange={val => setNum(val)}
          placeholder="请输入数字"
        />
      </Cell>
      <Popup
        visible={datePickerShow}
        style={{ height: '30%' }}
        position="bottom"
        onClose={() => setDatePickerShow(false)}
      >
        <DatetimePicker
          type="datetime"
          minDate={new Date(2020, 0, 1)}
          maxDate={new Date(2025, 10, 1)}
          value={commitDate}
          onConfirm={value => datePickerChange(value)}
          onCancel={() => setDatePickerShow(false)}
        />
      </Popup>

      <Tabs border type="capsule">
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.id} title={tab.name}>
            {tab.id === 1 ? (
              <div>
                {payIcons.map(icon => (
                  <Card key={icon.type}>
                    <Card.Header>{icon.type}</Card.Header>
                    <Card.Body className="flex">
                      {icon.children.map(child => (
                        <div
                          key={child.name}
                          className="flex flex-col justify-center items-center p-5"
                          onClick={() =>
                            iconClick({
                              type: tab.type,
                              useFor: child.name,
                              icon: child.icon
                            })
                          }
                        >
                          <div
                            className={`i-${child.icon} text-center p2 text-xl text-yellow-500`}
                          ></div>
                          <div className="text-center p-2 font-bold">
                            {child.name}
                          </div>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                ))}
              </div>
            ) : (
              <div>
                {incomeIcons.map(icon => (
                  <Card key={icon.type}>
                    <Card.Header>{icon.type}</Card.Header>
                    <Card.Body className="flex">
                      {icon.children.map(child => (
                        <div
                          key={child.name}
                          className="flex flex-col justify-center items-center p-5"
                        >
                          <div
                            className={`i-${child.icon} text-center p2 text-xl text-yellow-500`}
                          ></div>
                          <div className="text-center p-2 font-bold">
                            {child.name}
                          </div>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </>
  );
}

export default AddBill;
