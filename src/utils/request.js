import axios from 'axios'
import { getUserAuth } from '@/utils/auth.js'

const instance = axios.create({
  // baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  // baseURL: 'https://gymall.guying18.com',
  timeout: 10000
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    const token = getUserAuth()?.token
    const AUTH_TOKEN = `Token ${token}`
    instance.get(url, { params, headers: { Authorization: AUTH_TOKEN } })
      .then(response => {
        // console.log('get-response', response)
        resolve(response.data)
      }).catch(err => {
        reject(err)
      })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    const token = getUserAuth()?.token
    const AUTH_TOKEN = `Token ${token}`
    instance.post(url, data, {
      headers: {
        // 'Content-Type': 'aplication/json',
        Authorization: AUTH_TOKEN
      }
    }).then(response => {
      // console.log('post-response', response)
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const patch = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    const token = getUserAuth()?.token
    const AUTH_TOKEN = `Token ${token}`
    instance.patch(url, data, {
      headers: {
        // 'Content-Type': 'aplication/json',
        Authorization: AUTH_TOKEN
      }
    }).then(response => {
      // console.log('post-response', response)
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}
