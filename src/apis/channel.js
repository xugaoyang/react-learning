import { request } from '@/utils'

const getChannelListApi = async () => {
  return await request.get('/channels')
}

export { getChannelListApi }
