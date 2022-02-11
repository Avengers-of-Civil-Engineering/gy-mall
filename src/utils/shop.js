import { get } from './request.js'

// 获取指定 shopId 的商铺信息
export const getShopInfo = (shopId) => {
  return get(`/api/v1/merchants/${shopId}`)
}

// 获取指定 shopId 的商铺所有 tabs
export const getShopTabs = (shopId) => {
  return get(`/api/v1/merchants/${shopId}/tabs/`)
}

// 获取指定 shopId 的商铺内 指定 tab 的所有商品
export const getShopTabProducts = (shopId, tab) => {
  return get(`/api/v1/merchants/${shopId}/products`, { tab })
}

// 获取所有商铺列表
export const getShopInfoList = () => {
  return get('/api/v1/merchants/')
}
