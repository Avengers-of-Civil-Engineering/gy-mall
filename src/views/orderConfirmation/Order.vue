<template>
  <div class="order">
    <div class="order__price">实付金额
      <b class="order__price__num">&yen;{{calculations.totalPrice}}</b>
    </div>
    <div class="order__btn"
         @click="handleSubmit">提交订单</div>
  </div>
  <Modal :showModal="showModal"
         :modalData="modalData"
         @cancel="handleCancel"
         @ok="handleOk" />
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import useCommonCartEffect from '@/effect/CartEffects.js'
import Modal from '@/components/Modal.vue'

const modalData = {
  title: '确认要离开收银台？',
  desc: '请尽快完成支付，否则将被取消',
  cancelText: '取消订单',
  okText: '确认订单'
}

export default {
  name: 'Order',
  components: { Modal },
  setup () {
    const showModal = ref(false)
    const route = useRoute()
    const shopId = route.params.id
    const { calculations } = useCommonCartEffect(shopId)
    const handleSubmit = () => {
      showModal.value = true
    }
    const handleCancel = () => {
      // console.log('cancel')
      showModal.value = false
    }
    const handleOk = () => {
      // console.log('ok')
      showModal.value = false
    }

    return { calculations, showModal, handleSubmit, modalData, handleCancel, handleOk }
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
