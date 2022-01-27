<template>
  <div class="title">购物车</div>
  <div class="wrapper">
    <div class="shop">
      <template v-for="(item, key) in cartList"
                :key="key">
        <CartProductTab :shopName="item.shopName"
                        :productList="item.productList" />
      </template>
    </div>
  </div>
  <Docker :currentIndex="1" />
</template>

<script>
import useCommonCartEffect from '@/effect/CartEffects.js'
import Docker from '@/components/Docker.vue'
import CartProductTab from '@/components/CartProductTab.vue'

export default {
  name: 'CartList',
  components: { Docker, CartProductTab },
  setup () {
    const { cartList } = useCommonCartEffect()
    // cartList: {shopId: {shopName: '', productList: { productId: {} } }
    console.log('cartList', cartList)

    return { cartList }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.title {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0.31rem 0 0.11rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  text-align: center;
  color: $content-fontcolor;
  background: $bg-color;
}
.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0.64rem;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0.16rem 0.18rem;
  background: $page-bgColor;
}
.shop {
  position: absolute;
  top: 0rem;
  left: 0.18rem;
  right: 0.18rem;
  bottom: 0;
}
</style>
