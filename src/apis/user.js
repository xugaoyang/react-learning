import { request } from '@/utils'

const login = async (form) => {
  return await request.post('/authorizations', form)
}

const getUser = async () => {
  return await request.get('/user/profile')
}

export { login, getUser }
