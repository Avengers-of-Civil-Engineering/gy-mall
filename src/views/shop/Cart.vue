<template>
  <div class="mask"
       v-show="showCartInfo && calculations.total > 0"
       @click="handleToggleCart"></div>
  <div class="cart">
    <div class="product"
         v-show="showCartInfo && calculations.total > 0">
      <div class="product__header">
        <div class="product__header__all">
          <span class="product__header__icon iconfont"
                @click="() => changeAllChecked(shopId, calculations.allChecked)"
                v-html="calculations.allChecked? '&#xe656;': '&#xe7ae;'"></span>
          全选
        </div>
        <div class="product__header__clear">
          <span class="product__header__clear__btn"
                @click="cleanCart(shopId)">清空购物车</span>
        </div>
      </div>
      <CartProductInfo :shopId="shopId" />
    </div>
    <div class="check">
      <div class="check__icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png"
             class="check__icon__img"
             @click="handleToggleCart">
        <div class="check__icon__tag">{{calculations.total}}</div>
      </div>
      <div class="check__info">
        总计:<span class="check__info__price">&yen;{{calculations.totalPrice}}</span>
      </div>
      <div class="check__btn"
           v-if="calculations.total > 0">
        <router-link :to="`/orderConfirmation/${shopId}`">去结算</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import useCommonCartEffect from '@/effect/CartEffects.js'
import { useStore } from 'vuex'
import CartProductInfo from '@/components/CartProductInfo.vue'

// 处理切换购物车详细内容展示的逻辑
const useToggleCartInfo = () => {
  const showCartInfo = ref(false)
  const handleToggleCart = () => {
    showCartInfo.value = !showCartInfo.value
  }
  return { showCartInfo, handleToggleCart }
}

export default {
  name: 'Cart',
  components: { CartProductInfo },
  setup () {
    const store = useStore()
    const route = useRoute()
    const shopId = route.params.id

    const { showCartInfo, handleToggleCart } = useToggleCartInfo()
    const { changeCartItemInfo, getProductCartCount, productList, calculations } = useCommonCartEffect(shopId)
    // console.log('productList', productList)

    const changeAllChecked = (shopId, isAllChecked) => {
      store.commit('changeAllChecked', { shopId, isAllChecked })
    }
    const cleanCart = (shopId) => {
      store.commit('cleanCart', { shopId })
    }

    return {
      shopId,
      showCartInfo,
      handleToggleCart,
      changeCartItemInfo,
      getProductCartCount,
      productList,
      calculations,
      changeAllChecked,
      cleanCart
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

.mask {
  position: fixed;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}
.cart {
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
}
.product {
  overflow-y: scroll;
  background: $bg-color;
  &__header {
    padding: 0.16rem 0;
    display: flex;
    border-bottom: 0.01rem solid $content-bgcolor;
    &__all {
      flex: 1;
      margin-left: 0.18rem;
      line-height: 0.16rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
    }
    &__icon {
      margin-right: 0.06rem;
      font-size: 0.2rem;
      color: $btn-bgColor;
    }
    &__clear {
      margin-right: 0.18rem;
      width: 0.7rem;
      &__btn {
        display: inline-block;
        line-height: 0.16rem;
        font-size: 0.14rem;
        text-align: center;
        color: $content-fontcolor;
      }
    }
  }
}
.check {
  display: flex;
  box-sizing: border-box;
  height: 0.5rem;
  border-top: 0.01rem solid $content-bgcolor;
  background: $bg-color;
  line-height: 0.5rem;
  &__icon {
    position: relative;
    width: 0.84rem;
    &__img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &__tag {
      position: absolute;
      left: 0.46rem;
      top: 0.04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      font-size: 0.16rem;
      color: $bg-color;
      text-align: center;
      background: $hightlight-fontColor;
      border-radius: 0.1rem;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    font-size: 0.12rem;
    color: $content-fontcolor;
    &__price {
      font-size: 0.18rem;
      color: $hightlight-fontColor;
    }
  }
  &__btn {
    width: 0.98rem;
    font-size: 0.14rem;
    text-align: center;
    background: $btn-bgcolor;
    a {
      color: $bg-color;
      text-decoration: none;
    }
  }
}
</style>
