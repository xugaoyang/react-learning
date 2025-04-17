import { Card, Form, Input, Button, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import {setToken} from '@/store/modules/user'
import { useDispatch } from 'react-redux'
import { login } from '@/apis/user'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    console.log('Success:', values)
    const res = await login(values)
    dispatch(setToken(res.data.token))
    message.success('登陆成功!')
    navigate('/')
  }
  const onFinishFailed = (errorInfo) => {
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
            label="mobile"
            name="mobile"
            rules={[{ required: true, message: 'Please input your mobile number!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="mobile number" />
          </Form.Item>

          <Form.Item
            label="Code"
            name="code"
            rules={[{ required: true, message: 'Please input your code!' }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="code" />
          </Form.Item>
          <Form.Item label={null}>
            <Button className="w-full" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
