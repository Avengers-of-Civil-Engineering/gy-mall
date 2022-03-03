<template>
  <div class="receiver"
       v-for="item in addressInfoList"
       :key="item.id">
    <div class="receiver__position iconfont"
         v-if="isSingle === 'true'">&#xe65e;</div>
    <div class="receiver__content"
         @click="() => handleSelect(item.id)">
      <div class="receiver__info">
        <span class="receiver__info__name">{{item.name}}</span>
        <span class="receiver__info__phone">{{item.phone_number}}</span>
      </div>
      <div class="receiver__address">{{item.address_full_txt}}</div>
    </div>
    <div class="receiver__icon iconfont"
         @click="() => handleEditClick(item.id)"
         v-if="isSingle !== 'true'">&#xe6a3;</div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAddressInfo, getAddressInfoList } from '@/utils/address.js'
import { getOrderInfo } from '@/utils/order.js'
// import { useOrderInfoEffect } from '@/views/orderList/useOrder.js'

// 获取 收货地址 列表
const useAddressEffect = (isSingle) => {
  const addressData = reactive({
    addressInfoList: []
  })
  const getAddress = async () => {
    if (isSingle !== 'true') {
      try {
        const result = await getAddressInfoList()
        // console.log('result', result)
        if (result) {
          addressData.addressInfoList = result
        }
      } catch (e) {
        console.log('error', e)
      }
    } else {
      const route = useRoute()
      const orderId = route.params.id
      try {
        const orderInfo = await getOrderInfo(orderId)
        const result = await getAddressInfo(orderInfo.address_id)
        // console.log('result', result)
        if (result) {
          addressData.addressInfoList.push(result)
        }
      } catch (e) {
        console.log('error', e)
      }
    }
  }

  getAddress()
  const { addressInfoList } = toRefs(addressData)
  return { addressInfoList }
}

export default {
  name: 'AddressTab',
  props: ['isSingle', 'addressId'],
  emits: ['selectId'],
  setup (props, { emit }) {
    const router = useRouter()
    const handleEditClick = (id) => {
      router.push({ path: `/editAddress/${id}` })
    }
    const handleSelect = (id) => {
      emit('selectId', id)
    }
    const { addressInfoList } = useAddressEffect(props.isSingle, props.addressId)

    return { addressInfoList, handleSelect, handleEditClick }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

.receiver {
  display: flex;
  position: relative;
  height: 1.04rem;
  margin-bottom: 0.16rem;
  padding: 0.18rem 0.16rem;
  box-sizing: border-box;
  background: $bg-color;
  border-radius: 0.04rem;
  &__position {
    font-size: 0.25rem;
    width: 12%;
    line-height: 0.5rem;
    text-align: left;
    color: $hightlight-fontColor;
  }
  &__content {
    width: 100%;
  }
  &__info {
    flex: 1;
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
