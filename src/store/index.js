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
    }
  },
  actions: {
  },
  modules: {
  }
})
