<template>
  <div class="modal"
       v-if="showModal">
    <div class="modal__content">
      <h3 class="modal__content__title">{{modalData.title}}</h3>
      <p class="modal__content__desc">{{modalData.desc}}</p>
      <div class="modal__content__btns">
        <div class="modal__content__cancel"
             @click="cancel">{{modalData.cancelText}}</div>
        <div class="modal__content__ok"
             @click="ok">{{modalData.okText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['showModal', 'modalData'],
  emits: ['cancel', 'ok'],
  setup (props, { emit }) {
    const cancel = () => {
      emit('cancel')
    }
    const ok = () => {
      emit('ok')
    }
    return { cancel, ok }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  &__content {
    position: absolute;
    padding: 0.24rem 0;
    box-sizing: border-box;
    top: 50%;
    left: 50%;
    width: 3rem;
    height: 1.57rem;
    transform: translate(-50%, -50%);
    background: $bg-color;
    border-radius: 0.04rem;
    &__title {
      margin: 0;
      line-height: 0.25rem;
      font-size: 0.18rem;
      text-align: center;
      color: $content-fontcolor;
    }
    &__desc {
      margin: 0.08rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      text-align: center;
      color: $medium-fontColor;
    }
    &__btns {
      display: flex;
      justify-content: space-between;
      margin-top: 0.24rem;
      padding: 0 0.59rem;
    }
    &__cancel {
      width: 0.8rem;
      line-height: 0.32rem;
      font-size: 0.14rem;
      text-align: center;
      color: $btn-bgcolor;
      border: 0.01rem solid $btn-bgcolor;
      border-radius: 0.16rem;
    }
    &__ok {
      width: 0.8rem;
      line-height: 0.32rem;
      font-size: 0.14rem;
      text-align: center;
      color: $bg-color;
      border-radius: 0.16rem;
      background: $btn-bgcolor;
    }
  }
}
</style>
