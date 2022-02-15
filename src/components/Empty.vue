<template>
  <div class="empty">
    <h2 class="empty__text">{{msg}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Empty',
  props: {
    msg: {
      type: String,
      default () {
        return '抱歉，没有结果'
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/style/variables";

.empty {
  position: absolute;
  left: 0;
  right: 0;
  top: 0.44rem;
  bottom: 0;
  &__text {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-weight: normal;
    text-align: center;
    color: $content-fontcolor;
  }
}
</style>
