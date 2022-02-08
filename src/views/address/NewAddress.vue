<template>

  <Head hasBack="true"
        title="新建收货地址"
        goText="保存"
        @go="handleSave" />
  <AddressForm />
</template>

<script>
import { useRouter } from 'vue-router'
import Head from '@/components/Head.vue'
import AddressForm from './AddressForm.vue'

export default {
  name: 'NewAddress',
  components: { Head, AddressForm },
  setup () {
    const router = useRouter()
    const handleSave = () => {
      // TODO: 此处应为提交 ’新建收获地址‘ 的修改
      router.back()
    }
    return { handleSave }
  }
}
</script>

<style lang="scss" scoped>
</style>
