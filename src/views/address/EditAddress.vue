<template>

  <Head hasBack="true"
        title="编辑收货地址" />
  <AddressForm msg="edit" />
</template>

<script>
import Head from '@/components/Head.vue'
import AddressForm from './AddressForm.vue'

export default {
  name: 'EditAddress',
  components: { Head, AddressForm }
}
</script>

<style lang="scss" scoped>
</style>
