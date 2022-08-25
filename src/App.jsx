import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ReadOutlined,
    EditOutlined,
    CaretDownOutlined
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Breadcrumb, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import LogoImg from './assets/react.svg'
const { Header, Sider, Content, Footer } = Layout;

const App = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [collapsed, setCollapsed] = useState(false);
    const [avatar, setAvatar] = useState(LogoImg)
    const [username, setUsername] = useState('游客')
    const [defaultKey, setDefaultKey] = useState('')
    const [breadName, setBreadName] = useState('')

    useEffect(() => {
        const online_avatar = sessionStorage.getItem('avatar')
        const online_username = sessionStorage.getItem('username')
        if (online_avatar) {
            setAvatar(`http://47.93.114.103:6688/${online_avatar}`)
        }
        if (online_username) {
            setUsername(online_username)
        }
        setDefaultKey(location.pathname.substring(1))
    }, [])

    useEffect(() => {
        switch (location.pathname) {
            case '/list':
                setBreadName('查看文章列表')
                break
            case '/edit':
                setBreadName('文章编辑')
                break
            case '/means':
                setBreadName('修改资料')
                break
            default:
                break
        }
    }, [location.pathname])

    // 退出登录
    const logout = () => {
        message.success('正在退出登录...')
        setTimeout(() => {
            navigate('/login')
        }, 1000)
    }

    // 左侧菜单按钮点击
    const handMenuClick = e => {
        navigate(`/${e.key}`)
        setDefaultKey(e.key)
    }

    return (
        <Layout id='layout_box'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[defaultKey]}
                    onClick={handMenuClick}
                    items={[
                        {
                            key: 'list',
                            icon: <ReadOutlined />,
                            label: '查看文章列表',
                        },
                        {
                            key: 'edit',
                            icon: <EditOutlined />,
                            label: '文章编辑',
                        },
                        {
                            key: 'means',
                            icon: <ReadOutlined />,
                            label: '修改资料',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0
                    }}
                >
                    <div className='header_bar'>

                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}

                        <Dropdown overlay={
                            <Menu items={[
                                {
                                    key: '1',
                                    label: (
                                        <span>修改信息</span>
                                    ),
                                },
                                {
                                    key: '2',
                                    label: (
                                        <span onClick={logout}>退出登录</span>
                                    ),
                                },
                            ]} />
                        }>
                            <a onClick={(e) => e.preventDefault()}>
                                <img style={{ width: '30px', height: '30px', borderRadius: '50%' }} src={avatar} alt='avatar' />
                                <span style={{ margin: '0 10px' }}>{username}</span>
                                <CaretDownOutlined />
                            </a>
                        </Dropdown>

                    </div>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        backgroundColor: '#f0f2f5',
                    }}
                >
                    <div style={{
                        margin: '5px 16px'
                    }}>
                        <Breadcrumb>
                            <Breadcrumb.Item href='/'>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {breadName}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <div style={{
                        margin: '0 16px 24px 16px',
                        padding: 24,
                        height: 'calc(100vh - 80px - 64px - 48px)',
                        overflowY: 'scroll',
                        backgroundColor: '#fff'
                    }}>
                        <Outlet />
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                        backgroundColor: '#001529',
                        color: '#fff'
                    }}
                >
                    Respect | Copyright © 2022 Author Da
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;