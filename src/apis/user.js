import { request } from '@/utils'

const loginApi = async (form) => {
  return await request.post('/authorizations', form)
}

const getUserApi = async () => {
  return await request.get('/user/profile')
}

export { loginApi, getUserApi }
