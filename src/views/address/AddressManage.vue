<template>

  <Head hasBack="true"
        title="管理收货地址"
        goText="新建"
        @go="handleNew" />
  <div class="wrapper">
    <div class="text">我的收货地址</div>
    <AddressTab @selectId="handleSelect" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import Head from '@/components/Head.vue'
import AddressTab from './AddressTab.vue'

export default {
  name: 'AddressManage',
  components: { Head, AddressTab },
  setup () {
    const router = useRouter()
    const handleNew = () => {
      router.push({ name: 'NewAddress' })
    }
    const handleSelect = (id) => {
      // TODO: 如何传递收货地址id
      localStorage.setItem('selectedAddressId', id)
      router.back()
    }
    return { handleNew, handleSelect }
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
  bottom: 0;
  padding: 0 0.18rem;
  background: $page-bgColor;
}
.text {
  margin: 0.16rem 0 0.12rem 0;
  font-size: 0.14rem;
  color: $content-fontcolor;
}
</style>
