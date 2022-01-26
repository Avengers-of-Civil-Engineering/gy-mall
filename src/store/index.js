import { createStore } from 'vuex'

const setLocalStorage = (state) => {
  const { cartList } = state
  localStorage.cartList = JSON.stringify(cartList)
}

const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.cartList)
  } catch (e) {
    return {}
  }
}

export default createStore({
  state: {
    // cartList: {shopId: {shopName: '', productList: { productId: {} } }
    cartList: getLocalCartList()
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
    }
  },
  actions: {
  },
  modules: {
  }
})
