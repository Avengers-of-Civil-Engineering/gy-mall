import { computed } from 'vue'
import { useStore } from 'vuex'

const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', { shopId, productId, productInfo, num })
  }
  const getProductCartCount = (shopId, productId) => {
    const count = cartList?.[shopId]?.productList?.[productId]?.count || 0
    return count
  }
  const productList = computed(() => {
    const productList = cartList?.[shopId]?.productList || {}
    const noEmptyProductList = {}
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0) {
        noEmptyProductList[i] = product
      }
    }
    return noEmptyProductList
  })
  return { changeCartItemInfo, getProductCartCount, productList }
}

export default useCommonCartEffect
