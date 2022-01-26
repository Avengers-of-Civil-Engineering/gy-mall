<template>
  <div class="product">
    <div class="product__title">{{shopName}}</div>
    <div class="product__list">
      <div class="product__item"
           v-for="item in productList"
           :key="item._id">
        <img :src="item.imgUrl"
             class="product__item__img">
        <div class="product__item__details">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__price">
            <span class="product__item__count">
              <span class="product__item__yen">&yen;</span>
              {{item.price}} x {{item.count}}
            </span>
            <span class="product__item__total">
              <span class="product__item__yen">&yen;</span>
              {{(item.price * item.count).toFixed(2)}}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import useCommonCartEffect from '@/effect/CartEffects.js'

export default {
  name: 'ProductList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { shopName, productList } = useCommonCartEffect(shopId)
    return { shopName, productList }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

.product {
  position: absolute;
  top: 2.12rem;
  left: 0.18rem;
  right: 0.18rem;
  height: 3rem;
  padding: 0.16rem;
  background: $bg-color;
  border-radius: 0.04rem;
  &__title {
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
  }
  &__list {
    overflow-y: scroll;
    position: absolute;
    top: 0.38rem;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &__item {
    position: relative;
    display: flex;
    box-sizing: border-box;
    margin: 0 0.16rem;
    padding: 0.12rem 0;
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__details {
      flex: 1;
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
      display: flex;
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__total {
      flex: 1;
      text-align: right;
      color: $dark-fontcolor;
    }
  }
}
</style>
