import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchChannelList } from '@/store/modules/channel'

function Channel() {
  const { channelList } = useSelector((state) => state.channel)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchChannelList())
  }, [])

  return (
    <div>
      <ul>
        {channelList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Channel
