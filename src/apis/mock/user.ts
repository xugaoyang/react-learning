import { request } from '@/utils'


type LoginFormMock = {
    username: string
    password: string
}

const getUserApi = async () => {
    return await request.get('/api/user/info')
}

const loginApi = async (form: LoginFormMock) => {
    return await request.post('/api/user/login', form)
}

export { getUserApi, loginApi }
