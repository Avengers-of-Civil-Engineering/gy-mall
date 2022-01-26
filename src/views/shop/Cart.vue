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
      <div class="product__item"
           v-for="item in productList"
           :key="item._id">
        <div class="product__item__checked iconfont"
             @click="() => changeCartItemChecked(shopId,item._id)"
             v-html="item.check ? '&#xe656;' : '&#xe7ae;'"></div>
        <img :src="item.imgUrl"
             class="product__item__img">
        <div class="product__item__details">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__item__number">
          <span class="product__item__number__minus iconfont"
                @click="() => {changeCartItemInfo(shopId, item._id, item, -1)}">&#xe780;</span>
          <span class="product__item__number__num">{{getProductCartCount(shopId, item._id)}}</span>
          <span class="product__item__number__plus iconfont"
                @click="() => {changeCartItemInfo(shopId, item._id, item, 1)}">&#xe653;</span>
        </div>
      </div>
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
    const changeCartItemChecked = (shopId, productId) => {
      store.commit('changeCartItemChecked', { shopId, productId })
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
      cleanCart,
      changeCartItemChecked
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
  &__item {
    position: relative;
    display: flex;
    box-sizing: border-box;
    margin: 0 0.16rem;
    padding: 0.12rem 0;
    border-bottom: 0.01rem solid $content-bgcolor;
    &__checked {
      width: 0.19rem;
      height: 0.19rem;
      margin-right: 0.16rem;
      line-height: 0.5rem;
      font-size: 0.2rem;
      color: $btn-bgColor;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__details {
      overflow: hidden;
    }
    &__title {
      margin: 0 0 0.06rem 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      font-weight: normal;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    &__number {
      position: absolute;
      right: 0;
      bottom: 0.12rem;
      &__minus {
        margin-right: 0.1rem;
        font-size: 0.2rem;
        color: $medium-fontColor;
      }
      &__num {
        position: relative;
        top: -0.02rem;
        font-size: 0.14rem;
        color: $content-fontcolor;
      }
      &__plus {
        margin-left: 0.1rem;
        font-size: 0.2rem;
        color: $btn-bgColor;
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
