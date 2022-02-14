import { get } from './request.js'

// 获取搜索结果
export const getSearchInfo = (config = {}) => {
  return get('/api/v1/search/', config)
}
