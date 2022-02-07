<template>
  <div class="title">购物车</div>
  <div class="wrapper">
    <div class="shops">
      <template v-for="(item, key) in cartList"
                :key="key">
        <CartProductInfo :shopId="key"
                         :shopName="item.shopName" />
      </template>
    </div>
  </div>
  <Check />
  <Docker :currentIndex="1" />
</template>

<script>
import { useStore } from 'vuex'
import CartProductInfo from '@/components/CartProductInfo.vue'
import Check from './Check.vue'
import Docker from '@/components/Docker.vue'

export default {
  name: 'CartList',
  components: { Check, Docker, CartProductInfo },
  setup () {
    const store = useStore()
    const cartList = store.state.cartList
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
  margin: 0.11rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  text-align: center;
  color: $content-fontcolor;
  background: $bg-color;
}
.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0.44rem;
  left: 0;
  right: 0;
  bottom: 1rem;
  padding: 0.16rem 0.18rem;
  background: $page-bgColor;
}
.shops {
  position: absolute;
  top: 0rem;
  left: 0.18rem;
  right: 0.18rem;
  bottom: 0.16rem;
}
</style>
