<template>
  <div class="product">
    <div class="product__checked iconfont"
         v-if="showCheck"
         v-html="isChecked ? '&#xe656;' : '&#xe7ae;'"></div>
    <img :src="item.imgUrl"
         :class="{'product__img-l': isImgLarge, 'product__img-s': !isImgLarge}">
    <div class="product__details">
      <h4 class="product__title">{{item.name}}</h4>
      <p class="product__sales"
         v-if="showSales">月售{{item.sales}}件</p>
      <p class="product__price">
        <span class="product__yen">&yen;</span>{{item.price}}
        <span class="product__origin">&yen;{{item.oldPrice}}</span>
      </p>
    </div>
    <div class="product__number">
      <span class="product__number__minus iconfont"
            @click="() => {changeCartItem(shopId, item._id, item, -1, shopName)}">&#xe780;</span>
      <span class="product__number__num">{{getProductCartCount(shopId, item._id)}}</span>
      <span class="product__number__plus iconfont"
            @click="() => {changeCartItem(shopId, item._id, item, 1, shopName)}">&#xe653;</span>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import useCommonCartEffect from '@/effect/CartEffects.js'
import { toRefs } from '@vue/reactivity'

export default {
  name: 'ProductInfo',
  props: ['shopId', 'shopName', 'item', 'isImgLarge', 'showCheck', 'showSales', 'isChecked'],
  setup (props) {
    const { shopId } = toRefs(props)
    const store = useStore()
    const { changeCartItemInfo, getProductCartCount } = useCommonCartEffect(shopId)
    const changeShopName = (shopId, shopName) => {
      store.commit('changeShopName', { shopId, shopName })
    }
    const changeCartItem = (shopId, productId, productInfo, num, shopName) => {
      changeCartItemInfo(shopId, productId, productInfo, num)
      changeShopName(shopId, shopName)
    }
    return { changeCartItem, getProductCartCount }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

.product {
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
  &__img-l {
    width: 0.68rem;
    height: 0.68rem;
    margin-right: 0.16rem;
  }
  &__img-s {
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
  &__sales {
    margin: 0;
    line-height: 0.16rem;
    font-size: 0.12rem;
    color: $content-fontcolor;
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
</style>
