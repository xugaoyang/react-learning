import { Collapse } from 'react-vant';
import dayjs from 'dayjs';

function Billday({ billDayData }) {
  return (
    <>
      <Collapse>
        <Collapse.Item
          title={
            <>
              <p className="font-bold">{billDayData.date}</p>
              <span>
                支出:
                <span className="ml-1 mr-2 text-pink-500">
                  {billDayData.paySum.toFixed(2)}
                </span>
              </span>
              <span>
                收入:
                <span className="ml-1 mr-2 text-green-500">
                  {billDayData.incomeSum.toFixed(2)}
                </span>
              </span>
              <span>
                结余:
                <span className="ml-1 text-blue-500">
                  {(billDayData.incomeSum - billDayData.paySum).toFixed(2)}
                </span>
              </span>
            </>
          }
          name={billDayData.date}
        >
          {billDayData.children.map(child => (
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
      </Collapse>
    </>
  );
}
export default Billday;
