import { request } from '@/utils'

const login = async (form) => {
  return await request.post('/authorizations', form)
}

export { login }
