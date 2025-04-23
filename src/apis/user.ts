import { request } from '@/utils'

type LoginForm = {
  mobile: string
  code: string
}

const loginApi = async (form: LoginForm) => {
  return await request.post('/authorizations', form)
}

const getUserApi = async () => {
  return await request.get('/user/profile')
}

export { loginApi, getUserApi }
