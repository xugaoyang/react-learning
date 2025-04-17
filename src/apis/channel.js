import { request } from '@/utils'

const getChannelList = async () => {
  return await request.get('/channels')
}

export { getChannelList }
