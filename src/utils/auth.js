// 定义 token 有效期
const LOGIN_VALID_SPAN = 7 * 24 * 3600 * 1000

// 检查 token 是否过期
export const isLoginAtValid = (loginAt) => {
  if (typeof loginAt === 'number' && (Date.now() - loginAt) < LOGIN_VALID_SPAN) {
    return true
  } else {
    return false
  }
}

// 从 localStorage 获取用户信息
export const getUserAuth = () => {
  const authInfoInJSON = localStorage.getItem('authInfo')
  if (!authInfoInJSON) {
    return null
  } else {
    try {
      const authInfo = JSON.parse(authInfoInJSON)
      if (authInfo.token && isLoginAtValid(authInfo.loginAt)) {
        return authInfo
      }
    } catch (err) {
      console.warn(`malformed authInfo! authInfoInJSON = "${authInfoInJSON}"`)
      localStorage.removeItem('authInfo')
    }
  }
}
