import { computed } from 'vue'
import { useStore } from 'vuex'

const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  // 提交修改单个商品数量的函数
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', { shopId, productId, productInfo, num })
  }
  // 计算给定 shopId 内对应于 productId 的商品数量
  const getProductCartCount = (shopId, productId) => {
    const count = cartList?.[shopId]?.productList?.[productId]?.count || 0
    return count
  }
  // 获取给定 shopId 的非空 productList
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
  // 获取给定 shopId 的 checkedProductList
  const checkedProductList = computed(() => {
    const productList = cartList?.[shopId]?.productList || {}
    const checkedList = {}
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0 && product.check) {
        checkedList[i] = product
      }
    }
    return checkedList
  })
  // 计算给定 shopId 的商品总数、总金额 和 是否全选状态
  const calculations = computed(() => {
    const productList = cartList?.[shopId]?.productList || {}
    const result = { total: 0, totalPrice: 0, allChecked: true }
    if (Object.keys(productList).length === 0) {
      result.allChecked = false
    } else {
      for (const i in productList) {
        const product = productList[i]
        result.total += product?.count
        if (product.check) {
          result.totalPrice += product?.count * product?.price
        }
        if ((product.count > 0 && !product?.check) || result.total === 0) {
          result.allChecked = false
        }
      }
    }
    result.totalPrice = result.totalPrice.toFixed(2)
    return result
  })
  // 给定 shopId 的商铺名 shopName
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })

  // 计算购物车页面 所选商品总和 及 所有商铺的商品是否为全选状态
  const cartCheckResult = computed(() => {
    const result = { totalPrice: 0, isAllSelected: true }
    for (const i in cartList) {
      // cartList: {shopId: {shopName: '', productList: { productId: {} } }
      const productList = cartList[i]?.productList || {}
      // console.log('productList', productList)
      if (productList) {
        for (const i in productList) {
          const product = productList[i]
          if (product.check) {
            result.totalPrice += product?.count * product?.price
          }
          if (product.count > 0 && !product?.check) {
            result.isAllSelected = false
          }
        }
      }
    }
    result.totalPrice = result.totalPrice.toFixed(2)
    return result
  })

  // 切换购物车页面 所有商铺的商品的否为全选状态
  const toggleAllSelected = (isAllSelected) => {
    store.commit('toggleAllSelected', { isAllSelected })
  }

  // 计算购物车页面 选中提交的商铺 shopIdList
  const toCheckShopIdList = computed(() => {
    const shopIdList = []
    for (const i in cartList) {
      const productList = cartList[i]?.productList || {}
      // console.log('productList', productList)
      if (productList) {
        for (const j in productList) {
          const product = productList[j]
          if (product.check) {
            if (!shopIdList.includes(i)) { shopIdList.push(i) }
          }
        }
      }
      // console.log('shopIdList', shopIdList)
    }
    return shopIdList
  })

  return {
    cartList,
    shopName,
    changeCartItemInfo,
    getProductCartCount,
    productList,
    checkedProductList,
    calculations,
    cartCheckResult,
    toggleAllSelected,
    toCheckShopIdList
  }
}

export default useCommonCartEffect
