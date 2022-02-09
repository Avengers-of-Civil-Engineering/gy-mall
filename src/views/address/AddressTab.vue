<template>
  <div class="receiver"
       v-for="item in addressInfoList"
       :key="item.id">
    <div class="receiver__info">
      <span class="receiver__info__name">{{item.name}}</span>
      <span class="receiver__info__phone">{{item.phone_number}}</span>
    </div>
    <div class="receiver__address">{{item.address_full_txt}}</div>
    <div class="receiver__icon iconfont"
         @click="() => handleEditClick(item.id)">&#xe6a3;</div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '@/utils/request.js'

// 获取 收货地址 列表
const useGetAddressListEffect = () => {
  const addressData = reactive({
    addressInfoList: []
  })
  const getAddressInfoList = async () => {
    try {
      const result = await get('/api/v1/addresses/')
      // console.log('result', result)
      if (result) {
        addressData.addressInfoList = result
      }
    } catch (e) {
      console.log('error', e)
    }
  }
  getAddressInfoList()
  const { addressInfoList } = toRefs(addressData)
  return { addressInfoList }
}

export default {
  name: 'AddressTab',
  setup () {
    const router = useRouter()
    const handleEditClick = (id) => {
      router.push({ path: `/editAddress/${id}` })
    }
    const { addressInfoList } = useGetAddressListEffect()
    return { addressInfoList, handleEditClick }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

.receiver {
  position: relative;
  height: 1.04rem;
  margin-bottom: 0.16rem;
  padding: 0.18rem 0.16rem;
  box-sizing: border-box;
  background: $bg-color;
  border-radius: 0.04rem;
  &__info {
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: $light-fontColor;
    &__name {
      margin-right: 0.66rem;
    }
  }
  &__address {
    margin: 0.14rem 0 0.06rem 0;
    width: 85%;
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
  }
  &__icon {
    position: absolute;
    top: 0.44rem;
    right: 0.16rem;
    font-size: 0.18rem;
    color: $medium-fontColor;
  }
}
</style>
