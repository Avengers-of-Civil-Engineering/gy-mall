<template>
  <div class="head">
    <div class="head__back iconfont"
         v-if="hasBack"
         @click="handleBack">&#xe679;</div>
    <div class="head__title">{{title}}</div>
    <div class="head__go"
         v-if="goText"
         @click="handleGoClick">{{goText}}</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Head',
  props: ['title', 'goText', 'hasBack'],
  emits: ['go'],
  setup (props, { emit }) {
    const router = useRouter()
    const handleBack = () => {
      router.back()
    }
    const handleGoClick = () => {
      emit('go')
    }
    return { handleBack, handleGoClick }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

.head {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0.11rem 0.18rem;
  line-height: 0.22rem;
  color: $content-fontcolor;
  background: $bg-color;
  &__back {
    width: 0.1rem;
    font-size: 0.2rem;
    color: $search-fontColor;
    @include extendClick;
  }
  &__title {
    flex: 1;
    font-size: 0.16rem;
    text-align: center;
  }
  &__go {
    font-size: 0.14rem;
    color: $content-fontcolor;
    text-align: right;
  }
}
</style>
