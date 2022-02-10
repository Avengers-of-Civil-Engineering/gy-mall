<template>
  <div class="order">
    <div class="order__price">实付金额
      <b class="order__price__num">&yen;{{cartCheckResult.totalPrice}}</b>
    </div>
    <div class="order__btn"
         @click="handleSubmit">提交订单</div>
  </div>
  <Modal v-if="showModal"
         :modalData="modalData"
         @cancel="() => handleConfirmOrder(true)"
         @ok="() => handleConfirmOrder(isSingle)" />
  <Toast v-if="show"
         :message="toastMessage" />
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import useCommonCartEffect from '@/effect/CartEffects.js'
import { post } from '@/utils/request.js'
import Modal from '@/components/Modal.vue'
import Toast, { useToastEffect } from '@/components/Toast.vue'

const modalData = {
  title: '确认要离开收银台？',
  desc: '请尽快完成支付，否则将被取消',
  cancelText: '取消订单',
  okText: '确认订单'
}

// 处理提交订单相关逻辑
const useConfirmOrderEffect = () => {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  const shopId = route.params.id
  const { checkedProductList, cartCheckResult } = useCommonCartEffect(shopId)

  const selectedAddressId = localStorage.getItem('selectedAddressId')
  const addressId = parseInt(selectedAddressId, 10)
  // console.log(typeof addressId)
  const { show, toastMessage, showToast } = useToastEffect()
  const handleConfirmOrder = async (isSingle) => {
    const products = []
    for (const i in checkedProductList.value) {
      const product = checkedProductList.value[i]
      products.push({ product_id: parseInt(product.id, 10), quantity: product.count })
    }
    try {
      const result = await post('/api/v1/orders/', {
        address_id: addressId,
        merchant_id: shopId,
        items: products
      })
      console.log(result)
      if (result) {
        store.commit('cleanCart', { shopId })
        router.push({ name: 'OrderList' })
      } else {
        showToast('获取失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  return { show, toastMessage, handleConfirmOrder, cartCheckResult }
}

export default {
  name: 'Order',
  components: { Modal, Toast },
  setup () {
    const showModal = ref(false)

    const { show, toastMessage, handleConfirmOrder, cartCheckResult } = useConfirmOrderEffect()
    const handleSubmit = () => {
      showModal.value = true
    }

    return { cartCheckResult, showModal, handleSubmit, modalData, show, toastMessage, handleConfirmOrder }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.order {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.5rem;
  box-sizing: border-box;
  border-top: 0.01rem solid $content-bgcolor;
  background: $bg-color;
  line-height: 0.5rem;
  &__price {
    display: inline-block;
    flex: 1;
    font-size: 0.14rem;
    text-indent: 0.24rem;
    color: $content-fontcolor;
    &__num {
      font-size: 0.16rem;
      color: #151515;
      text-align: right;
      line-height: 0.2rem;
    }
  }
  &__btn {
    width: 0.98rem;
    font-size: 0.14rem;
    text-align: center;
    background: $btn-bgcolor;
    color: $bg-color;
  }
}
</style>
