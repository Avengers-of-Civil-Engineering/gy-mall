<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <div class="shop">
      <img src="http://www.dell-lee.com/imgs/vue3/超市.png"
           class="shop__img">
      <div class="shop__content shop__content--border">
        <div class="shop__content__title">沃尔玛</div>
        <div class="shop__content__tags">
          <span class="shop__content__tag">月售1W+</span>
          <span class="shop__content__tag">起送¥0</span>
          <span class="shop__content__tag">基础运费¥5</span>
        </div>
        <div class="shop__content__hightlight">VIP尊享满89元减4元运费券（每月3张）</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nearby',
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
}
.shop {
  display: flex;
  padding-top: 0.12rem;
  &__img {
    margin-right: 0.16rem;
    width: 0.56rem;
    height: 0.56rem;
  }
  &__content {
    flex: 1;
    padding-bottom: 0.12rem;
    &--border {
      border-bottom: 0.01rem solid $content-bgcolor;
    }
    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }
    &__tags {
      margin: 0.08rem 0;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: $content-fontcolor;
    }
    &__tag {
      margin-right: 0.16rem;
    }
    &__hightlight {
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: $hightlight-fontColor;
    }
  }
}
</style>
