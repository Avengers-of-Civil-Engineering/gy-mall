import { get } from './request.js'

// 获取搜索结果
export const getSearchInfo = (config = {}) => {
  return get('/api/v1/search/', config)
}

// 获取搜索结果-优化
export const getSearchList = (config = {}) => {
  return get('/api/v1/search-merchant/', config)
}
