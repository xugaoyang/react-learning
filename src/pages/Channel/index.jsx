import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setChannel } from '@/store/modules/channel'
import { getChannelListApi } from '@/apis/channel'

function Channel() {
  const { channelList } = useSelector((state) => state.channel)
  const dispatch = useDispatch()
  useEffect(() => {
    const getChannels = async () => {
      const res = await getChannelListApi()
      dispatch(setChannel(res.data.channels))
    }
    getChannels()
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
