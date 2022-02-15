import { createStore } from 'vuex'
import { getProductInfo } from '@/utils/shop.js'

const setLocalStorage = (state) => {
  const { cartList } = state
  localStorage.cartList = JSON.stringify(cartList)
}
const setLocalSearchHistory = (state) => {
  const { searchHistory } = state
  localStorage.searchHistory = JSON.stringify(searchHistory)
}

const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.cartList)
  } catch (e) {
    return {}
  }
}
const getLocalSearchHistory = () => {
  try {
    return JSON.parse(localStorage.searchHistory)
  } catch (e) {
    return []
  }
}

export default createStore({
  state: {
    // cartList: {shopId: {shopName: '', productList: { productId: {} } }
    cartList: getLocalCartList(),
    searchHistory: getLocalSearchHistory()
  },
  mutations: {
    // 增删单个商品数量
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo, num } = payload
      const shopInfo = state.cartList?.[shopId] || { shopName: '', productList: {} }
      const productList = shopInfo?.productList
      let product = productList?.[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      product.count += num
      if (num > 0) {
        product.check = true
      }
      // console.log('product', product)
      productList[productId] = product

      if (product.count === 0) {
        // product.count = 0
        delete productList[productId]
      }
      shopInfo.productList = productList
      state.cartList[shopId] = shopInfo
      setLocalStorage(state)
    },
    // 从订单中添加商品到购物车
    addToCartFromOrder (state, payload) {
      const { shopId, productId, productInfo } = payload
      // console.log('shopId', shopId)
      // console.log('productId', productId)
      // console.log('mutations-productInfo', productInfo)
      const shopInfo = state.cartList?.[shopId] || { shopName: '', productList: {} }
      const productList = shopInfo?.productList
      let product = productList?.[productId]
      if (!product) {
        productInfo.count = 1
        productInfo.check = true
        product = productInfo
      } else {
        product.count += 1
      }
      productList[productId] = product
      shopInfo.productList = productList
      state.cartList[shopId] = shopInfo
      setLocalStorage(state)
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList?.[shopId] || { shopName: '', productList: {} }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalStorage(state)
    },
    changeAllChecked (state, payload) {
      const { shopId, isAllChecked } = payload
      // console.log('shopId', shopId)
      // console.log('isAllChecked', isAllChecked)
      const productList = state.cartList?.[shopId]?.productList
      if (productList) {
        for (const i in productList) {
          const product = productList[i]
          if (isAllChecked) {
            product.check = false
          } else {
            product.check = true
          }
        }
      }
      setLocalStorage(state)
    },
    toggleAllSelected (state, payload) {
      const { isAllSelected } = payload
      console.log('isAllSelected', isAllSelected)
      const cartList = state.cartList
      for (const i in cartList) {
        const productList = cartList?.[i]?.productList
        if (productList) {
          for (const i in productList) {
            const product = productList[i]
            if (isAllSelected) {
              product.check = false
            } else {
              product.check = true
            }
          }
        }
      }
      setLocalStorage(state)
    },
    // 清空指定商铺的购物车
    cleanCart (state, payload) {
      const { shopId } = payload
      // console.log('shopId', shopId)
      state.cartList[shopId].productList = {}
      setLocalStorage(state)
    },
    // 清空购物车所有商品
    clearCart (state, payload) {
      state.cartList = {}
      setLocalStorage(state)
    },
    // 删除已结算的购物车商品
    cleanCartOfChecked (state) {
      const cartList = state.cartList
      for (const i in cartList) {
        const productList = cartList[i]?.productList
        for (const j in productList) {
          const product = productList[j]
          if (product.check) {
            delete productList[j]
          }
        }
      }
      state.cartList = cartList
      setLocalStorage(state)
    },
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      // console.log('shopId', shopId)
      // console.log('productId', productId)
      const product = state.cartList?.[shopId]?.productList?.[productId]
      if (product) {
        product.check = !product.check
      }
      setLocalStorage(state)
    },
    addToSearchHistory (state, payload) {
      const { inputValue } = payload
      // console.log('--inputValue--', inputValue)
      const historyList = state.searchHistory
      // inputValue 不为空时处理数据
      if (inputValue) {
        const index = historyList.findIndex(item => item === inputValue)
        // console.log('index', index)
        if (index < 0) {
          historyList.unshift(inputValue)
        } else {
          // 若为已有搜索记录，则将其替换到第一位
          historyList.splice(index, 1)
          historyList.unshift(inputValue)
        }
      }
      state.searchHistory = historyList
      setLocalSearchHistory(state)
    },
    clearSearchHistory (state) {
      state.searchHistory = []
      setLocalSearchHistory(state)
    }
  },
  actions: {
    // 从订单中添加商品到购物车
    addToCartFromOrder ({ commit }, payload) {
      const { shopId, productId } = payload
      const getProduct = async () => {
        try {
          const result = await getProductInfo(productId)
          // console.log('action-productInfo', result)
          return result
        } catch (e) {
          console.log(e)
        }
      }
      // 不用将 promise 的值保存到变量，应该直接在 promise.then 内 commit mutation！！！
      getProduct().then(productInfo => {
        // console.log('action-productInfo-then', productInfo)
        commit('addToCartFromOrder', { shopId, productId, productInfo })
      })
    }
  },
  modules: {
  }
})
