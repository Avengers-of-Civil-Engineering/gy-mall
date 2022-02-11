import { get, patch, post } from './request.js'

// 获取单个地址详情
export const getAddressInfo = (addressId) => {
  return get(`/api/v1/addresses/${addressId}`)
}

// 编辑单个地址
export const editAddress = (addressId, config) => {
  return patch(`/api/v1/addresses/${addressId}`, config)
}

// 创建地址
export const newAddress = (config) => {
  return post('/api/v1/addresses/', config)
}

// 获取地址列表
export const getAddressInfoList = () => {
  return get('/api/v1/addresses/')
}
