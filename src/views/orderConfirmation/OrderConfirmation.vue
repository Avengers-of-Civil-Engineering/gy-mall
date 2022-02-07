<template>
  <div class="wrapper">
    <TopArea />
    <div class="container">
      <OrderConfirmProducts :shopId="shopId" />
    </div>
    <Order />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import TopArea from './TopArea.vue'
import OrderConfirmProducts from '@/components/OrderConfirmProducts.vue'
import Order from './Order.vue'

export default {
  name: 'OrderConfirmation',
  components: { TopArea, OrderConfirmProducts, Order },
  setup () {
    const route = useRoute()
    const shopId = route.params.id

    return { shopId }
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
  top: 1.96rem;
  left: 0.18rem;
  right: 0.18rem;
  height: 3rem;
}
</style>
