import { createStore } from 'vuex'

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
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo, num } = payload
      const shopInfo = state.cartList?.[shopId] || { shopName: '', productList: {} }
      let product = shopInfo?.productList?.[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      product.count += num
      if (num > 0) {
        product.check = true
      }
      // console.log('product', product)
      if (product.count < 0) {
        product.count = 0
      }
      shopInfo.productList[productId] = product
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
    cleanCart (state, payload) {
      const { shopId } = payload
      // console.log('shopId', shopId)
      state.cartList[shopId].productList = {}
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
  },
  modules: {
  }
})
