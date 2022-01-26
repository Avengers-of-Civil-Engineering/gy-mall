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
  const calculations = computed(() => {
    const productList = cartList?.[shopId]?.productList || {}
    const result = { total: 0, totalPrice: 0, allChecked: true }
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        result.total += product?.count
        if (product.check) {
          result.totalPrice += product?.count * product?.price
        }
        if (product.count > 0 && !product?.check) {
          result.allChecked = false
        }
      }
    }
    result.totalPrice = result.totalPrice.toFixed(2)
    return result
  })
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })
  return { shopName, changeCartItemInfo, getProductCartCount, productList, calculations }
}

export default useCommonCartEffect
