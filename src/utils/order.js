import { get } from './request.js'

export const getOrderInfo = (orderId) => {
  return get(`/api/v1/orders/${orderId}`)
}

export const getOrderInfoList = () => {
  return get('/api/v1/orders/')
}
