import { get } from './request.js'

// 获取单个订单详情
export const getOrderInfo = (orderId) => {
  return get(`/api/v1/orders/${orderId}`)
}

// 获取订单列表
export const getOrderInfoList = () => {
  return get('/api/v1/orders/')
}
