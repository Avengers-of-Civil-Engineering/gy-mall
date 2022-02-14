import { get, patch, post } from './request.js'

// 上传图片
export const uploadImage = (formData) => {
  return post('/api/v1/images/', formData)
}

// 修改用户头像
export const changeUserImg = (username, id) => {
  return patch(`/api/v1/users/${username}`, { avatar_id: id })
}

// 获取用户信息
export const getUserInfo = () => {
  return get('/api/v1/users/about_me/')
}
