<template>
  <div class="top">
    <div class="top__header">
      <div class="top__header__back iconfont"
           @click="handleBackClick">&#xe679;</div>
      确认订单
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">{{selectedAddress.address_full_txt}}</div>
      <div class="top__receiver__info">
        <span class="top__receiver__info__name">{{selectedAddress.name}}</span>
        <span class="top__receiver__info__phone">{{selectedAddress.phone_number}}</span>
      </div>
      <div class="top__receiver__icon iconfont"
           @click="handleToSelectAddress">&#xe6a3;</div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '@/utils/request.js'

const getSelectedAddressInfoEffect = () => {
  const data = reactive({
    selectedAddress: {}
  })
  const selectedAddressId = localStorage.getItem('selectedAddressId')
  // console.log('selectedAddressId', selectedAddressId)
  const getSelectedAddress = async () => {
    try {
      const result = await get(`/api/v1/addresses/${selectedAddressId}/`)
      // console.log('result', result)
      if (result) {
        data.selectedAddress = result
      }
    } catch (e) {
      console.log(e)
    }
  }
  getSelectedAddress()
  const { selectedAddress } = toRefs(data)
  return { selectedAddress }
}

export default {
  name: 'TopArea',
  setup () {
    const router = useRouter()

    const handleBackClick = () => {
      router.back()
    }
    const handleToSelectAddress = () => {
      router.push({ name: 'AddressManage' })
    }
    const { selectedAddress } = getSelectedAddressInfoEffect()
    return { selectedAddress, handleBackClick, handleToSelectAddress }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  background-repeat: no-repeat;
  &__header {
    padding-top: 0.4rem;
    line-height: 0.24rem;
    font-size: 0.16rem;
    color: $bg-color;
    text-align: center;
    &__back {
      position: absolute;
      left: 0.18rem;
      top: 0.4rem;
      font-size: 0.22rem;
    }
  }
  &__receiver {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    height: 1.11rem;
    padding: 0.16rem;
    box-sizing: border-box;
    background: $bg-color;
    border-radius: 0.04rem;
    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }
    &__address {
      margin: 0.14rem 0 0.06rem 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
    }
    &__info {
      line-height: 0.17rem;
      font-size: 0.12rem;
      color: $medium-fontColor;
      &__name {
        margin-right: 0.2rem;
      }
    }
    &__icon {
      position: absolute;
      top: 0.48rem;
      right: 0.16rem;
      font-size: 0.18rem;
      color: $medium-fontColor;
    }
  }
}
</style>
