import request from './request'

// 注册接口
export const RegisterApi = (params) => request.post('/register', params)

// 登录接口
export const LoginApi = (params) => request.post('/login', params)

// 获取文章列表接口
export const ArticleListApi = (params) => request.get('/article', { params })