import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { RegisterApi } from '../request/api'
import LogoImg from '../assets/react.svg'
import './css/login.css'

export default function Register() {

  const navigate = useNavigate()

  const onFinish = (values) => {
    RegisterApi({
      username: values.username,
      password: values.password
    }).then(res => {
      if (res.errCode === 0) {
        message.success(res.message)
        // 延迟1秒跳转登录页面
        setTimeout(() => {
          navigate('/login')
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

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入相同的密码',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password
              size='large'
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder='再次输入密码' />
          </Form.Item>

          <Form.Item>
            <Link to="/login">已有账号?前往登录</Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" size='large' block htmlType="submit">
              立即注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
