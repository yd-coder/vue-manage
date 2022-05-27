import Cookie from 'js-cookie'
export default {
  state: {
    token: ''
  },
  mutations: {
    setToken (state, token) { // 设置token
      state.token = token
      Cookie.set('token', token)
    },
    removeToken (state) { // 删除token
      state.token = ''
      Cookie.remove('token')
    },
    getToken (state) { // 获取token
      state.token = state.token || Cookie.get('token')
    }
  },
}