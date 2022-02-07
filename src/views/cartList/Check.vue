<template>
  <div class="check">
    <div class="check__all">
      <span class="check__all__icon iconfont"
            @click="() => toggleAllSelected(checkResult.isAllSelected)"
            v-html="checkResult.isAllSelected? '&#xe656;': '&#xe7ae;'"></span>
      全选
    </div>
    <div class="check__info">
      合计:<span class="check__info__price">&yen;{{checkResult.totalPrice}}</span>
    </div>
    <div class="check__btn"
         v-if="checkResult.totalPrice > 0">
      <span class="check__btn__text">去结算</span>
      <!-- <router-link :to="`/orderConfirmation/${shopId}`">去结算</router-link> -->
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

// 计算购物车选中商品价格逻辑
const useCheckEffect = () => {
  const store = useStore()

  // 计算购物车总结和是否全选状态
  const checkResult = computed(() => {
    const cartList = store.state.cartList
    // cartList: {shopId: {shopName: '', productList: { productId: {} } }
    const result = { totalPrice: 0, isAllSelected: true }
    for (const i in cartList) {
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

  // 切换全选状态
  const toggleAllSelected = (isAllSelected) => {
    store.commit('toggleAllSelected', { isAllSelected })
  }
  return { checkResult, toggleAllSelected }
}

export default {
  name: 'Check',
  setup () {
    const { checkResult, toggleAllSelected } = useCheckEffect()
    return { checkResult, toggleAllSelected }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.check {
  display: flex;
  position: absolute;
  padding: 0 0.1rem;
  box-sizing: border-box;
  line-height: 0.5rem;
  left: 0;
  width: 100%;
  bottom: 0.5rem;
  background: $bg-color;
  &__all {
    position: relative;
    width: 0.84rem;
    font-size: 0.14rem;
    text-align: center;
    color: $content-fontcolor;
    &__icon {
      position: relative;
      top: 0.01rem;
      margin-right: 0.06rem;
      font-size: 0.2rem;
      color: $btn-bgColor;
    }
  }
  &__info {
    flex: 1;
    text-align: right;
    font-size: 0.12rem;
    color: $content-fontcolor;
    &__price {
      font-size: 0.18rem;
      color: $hightlight-fontColor;
    }
  }
  &__btn {
    width: 0.98rem;
    text-align: center;
    &__text {
      padding: 0.06rem 0.16rem;
      font-size: 0.14rem;
      background: $btn-bgcolor;
      color: $bg-color;
      border-radius: 0.2rem;
    }
    /* a {
      color: $bg-color;
      text-decoration: none;
    } */
  }
}
</style>
