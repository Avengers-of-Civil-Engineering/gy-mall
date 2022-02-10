<template>
  <div class="check">
    <div class="check__all">
      <span class="check__all__icon iconfont"
            @click="() => toggleAllSelected(cartCheckResult.isAllSelected)"
            v-html="cartCheckResult.isAllSelected? '&#xe656;': '&#xe7ae;'"></span>
      全选
    </div>
    <div class="check__info">
      合计:<span class="check__info__price">&yen;{{cartCheckResult.totalPrice}}</span>
    </div>
    <div class="check__btn"
         v-if="cartCheckResult.totalPrice > 0">
      <span class="check__btn__text">
        <router-link to="/ordersConfirmation">去结算</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import useCommonCartEffect from '@/effect/CartEffects.js'

export default {
  name: 'Check',
  setup () {
    const { cartCheckResult, toggleAllSelected } = useCommonCartEffect()
    return { cartCheckResult, toggleAllSelected }
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
      border-radius: 0.2rem;
    }
    a {
      color: $bg-color;
      text-decoration: none;
    }
  }
}
</style>
