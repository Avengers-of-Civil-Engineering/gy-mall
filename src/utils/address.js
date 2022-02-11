import { get } from './request.js'

export const getAddressInfo = (addressId) => {
  return get(`/api/v1/addresses/${addressId}`)
}

export const getAddressInfoList = () => {
  return get('/api/v1/addresses/')
}
