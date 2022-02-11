<template>
  <div class="wrapper">
    <TopArea />
    <div class="container">
      <template v-for="item in toCheckShopIdList"
                :key="item">
        <OrderConfirmProducts :shopId="item" />
      </template>
    </div>
    <Order isSingle="false" />
  </div>
</template>

<script>
import TopArea from './TopArea.vue'
import OrderConfirmProducts from './OrderConfirmProducts.vue'
import Order from './Order.vue'
import useCommonCartEffect from '@/effect/CartEffects.js'

export default {
  name: 'OrdersConfirmation',
  components: { TopArea, OrderConfirmProducts, Order },
  setup () {
    const { toCheckShopIdList } = useCommonCartEffect()

    return { toCheckShopIdList }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: $page-bgColor;
}
.container {
  position: absolute;
  overflow-y: scroll;
  top: 1.96rem;
  left: 0.18rem;
  right: 0.18rem;
  bottom: 0.5rem;
}
</style>
