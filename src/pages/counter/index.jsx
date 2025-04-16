import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, addToNum } from '@/store/counter'

function Counter() {
  const {count} = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  return (
    <div className="flex">
      <span className="flex items-center justify-center w-[50px] h-[50px] bg-blue-500 border cursor-pointer text-[40px]" onClick={() => dispatch(decrement())}>-</span>
      <span className="flex items-center justify-center w-[50px] h-[50px] border text-[40px]">{count}</span>
      <span className="flex items-center justify-center w-[50px] h-[50px] bg-blue-500 border cursor-pointer text-[40px]" onClick={() => dispatch(increment())} >+</span>
      <span className="flex items-center justify-center h-[50px] bg-blue-500 border cursor-pointer text-[40px]" onClick={() => dispatch(addToNum(20))} >加至20</span>
    </div>
  )
}

export default Counter
