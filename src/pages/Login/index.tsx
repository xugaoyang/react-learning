import { Card, Form, Input, Button, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import {setToken} from '@/store/modules/user'
import { useDispatch } from 'react-redux'
import { loginApi } from '@/apis/mock/user'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = async (values:any) => {
    console.log('Success:', values)
    const res = await loginApi(values)
    console.log('res', res)
    dispatch(setToken(res.data.token))
    message.success('登陆成功!')
    navigate('/')
  }
  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="w-full h-full flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Card>
        <div className="flex justify-center pl-[96px] pb-[10px]">
          <img src={reactLogo} alt="" />
          <span className="ml-[10px] mr-[10px] text-[24px]">+</span>
          <img src={viteLogo} alt="" />
        </div>
        
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item label={null}>
            <Button className="w-full" type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
