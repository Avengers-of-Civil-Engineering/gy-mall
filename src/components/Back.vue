<template>
  <div class="iconfont"
       @click="handleBack">
    &#xe679;
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

// 处理点击回退
export const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return { handleBack }
}
export default {
  name: 'Back',
  setup () {
    const { handleBack } = useBackRouterEffect()
    return { handleBack }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables";

.iconfont {
  font-size: 0.24rem;
  width: 0.3rem;
  color: #b6b6b6;
}
</style>
