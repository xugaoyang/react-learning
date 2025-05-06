import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setBillList} from '@/store/modules/bill'
import {billListApi} from '@/apis/bill'

function YearBill() {
  const { billList } = useSelector((state) => state.bill)
  const dispatch = useDispatch()
  useEffect(() => {
    const getBillList = async () => {
      const res = await billListApi()
      console.log('json-server res', res)
      dispatch(setBillList(res))
    }
    getBillList()
  }, [])
  return (
    <>
      year
    </>
  )
}

export default YearBill
