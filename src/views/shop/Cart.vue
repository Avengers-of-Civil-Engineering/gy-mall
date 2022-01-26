<template>
  <div class="cart">
    <div class="product">
      <div class="product__header">
        <div class="product__header__all">
          <span class="product__header__icon iconfont"
                v-html="isAllChecked? '&#xe656;': '&#xe7ae;'"></span>
          全选
        </div>
        <div class="product__header__clear">
          <span class="product__header__clear__btn">清空购物车</span>
        </div>
      </div>
      <div class="product__item">
        <ProductInfo v-for="item in productList"
                     :key="item._id"
                     :item="item"
                     :showCheck="true"
                     :shopId="shopId"
                     :shopName="shopName" />
      </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png"
             class="check__icon__img">
        <div class="check__icon__tag">1493803</div>
      </div>
      <div class="check__info">
        总计:<span class="check__info__price">&yen;66</span>
      </div>
      <div class="check__btn">去结算</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ProductInfo from '@/components/ProductInfo.vue'
import useCommonCartEffect from '@/effect/CartEffects.js'

export default {
  name: 'Cart',
  components: { ProductInfo },
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const isAllChecked = ref(true)
    const { productList } = useCommonCartEffect(shopId)
    console.log('productList', productList)
    return { productList, isAllChecked }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.cart {
  position: absolute;
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
    color: $bg-color;
    background: $btn-bgcolor;
  }
}
</style>
