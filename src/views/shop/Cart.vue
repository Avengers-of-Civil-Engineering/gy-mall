<template>
  <div class="cart">
    <div class="product"></div>
    <div class="check">
      <div class="check__icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png"
             class="check__icon__img">
        <div class="check__icon__tag">1493803</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen;66</span>
      </div>
      <div class="check__btn">去结算</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.cart {
  position: absolute;
  left: 0;
  right: 0;
  height: 0.5rem;
  bottom: 0;
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
