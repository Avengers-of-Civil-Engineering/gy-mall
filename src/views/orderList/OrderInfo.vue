<template>

  <Head hasBack="true"
        title="订单详情" />
  <div class="wrapper">
    <div class="container">
      <div class="address">
        <AddressTab isSingle="true" />
      </div>
      <OrderProducts />
    </div>
  </div>
</template>

<script>
import OrderProducts from './OrderProducts.vue'
import Head from '@/components/Head.vue'
import AddressTab from '@/views/address/AddressTab.vue'

export default {
  name: 'OrderInfo',
  components: { Head, OrderProducts, AddressTab }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.wrapper {
  position: absolute;
  overflow-y: scroll;
  top: 0.44rem;
  bottom: 0;
  left: 0;
  right: 0;
  background: $page-bgColor;
  ::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }
}
.container {
  position: absolute;
  top: 0;
  left: 0.18rem;
  right: 0.18rem;
  bottom: 0;
}
.address {
  margin-top: 0.16rem;
}
</style>
