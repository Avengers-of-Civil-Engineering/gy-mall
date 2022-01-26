import { createStore } from 'vuex'

export default createStore({
  state: {
    // cartList: {shopId: {shopName: '', productList: { productId: {} } }
    cartList: {}
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
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList?.[shopId] || { shopName: '', productList: {} }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
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
    },
    cleanCart (state, payload) {
      const { shopId } = payload
      // console.log('shopId', shopId)
      state.cartList[shopId].productList = {}
    },
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      // console.log('shopId', shopId)
      // console.log('productId', productId)
      const product = state.cartList?.[shopId]?.productList?.[productId]
      if (product) {
        product.check = !product.check
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
