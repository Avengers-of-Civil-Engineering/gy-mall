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
  return { changeCartItemInfo, getProductCartCount }
}

export default useCommonCartEffect
