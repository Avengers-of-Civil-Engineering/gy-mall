<template>

  <Head title="购物车" />
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
import Head from '@/components/Head.vue'

export default {
  name: 'CartList',
  components: { Head, Check, Docker, CartProductInfo },
  setup () {
    const store = useStore()
    const cartList = store.state.cartList
    return { cartList }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

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
