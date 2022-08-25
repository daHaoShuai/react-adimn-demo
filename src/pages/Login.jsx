import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginApi } from '../request/api'
import LogoImg from '../assets/react.svg'
import './css/login.css'

export default function Login() {

  const navigate = useNavigate()

  const onFinish = (values) => {
    LoginApi({
      username: values.username,
      password: values.password
    }).then(res => {
      console.log(res);
      if (res.errCode === 0) {
        message.success(res.message)
        // 保存用户信息
        sessionStorage.setItem('avatar',res.data.avatar)
        sessionStorage.setItem('cms-token',res.data['cms-token'])
        sessionStorage.setItem('editable',res.data.editable)
        sessionStorage.setItem('player',res.data.player)
        sessionStorage.setItem('username',res.data.username)
        // 跳转首页
        setTimeout(() => {
          navigate('/')
        }, 1000)
      } else {
        message.error(res.message)
      }
    })
  };


  return (
    <div className='login_main'>
      <div className='login_box'>
        <img src={LogoImg} alt="" />
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入账号',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder='请输入账号'
              size='large' />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input.Password
              size='large'
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder='请输入密码' />
          </Form.Item>

          <Form.Item>
            <Link to="/register">还没账号?立即注册</Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" size='large' block htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
