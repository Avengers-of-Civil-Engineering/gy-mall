<template>
  <div class="wrapper">
    <TopArea />
    <div class="container">
      <!-- <ProductList /> -->
      <CartProductTab :shopName="shopName"
                      :productList="productList" />
    </div>
    <Order />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import TopArea from './TopArea.vue'
// import ProductList from './ProductList.vue'
import CartProductTab from '@/components/CartProductTab.vue'
import Order from './Order.vue'
import useCommonCartEffect from '@/effect/CartEffects.js'

export default {
  name: 'OrderConfirmation',
  components: { TopArea, CartProductTab, Order },
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
