<template>
  <div class="wrapper">
    Mine
  </div>
  <Docker :currentIndex="3" />
</template>

<script>
import Docker from '@/components/Docker.vue'

export default {
  name: 'Mine',
  components: { Docker }
}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0 0.18rem 0.2rem 0.18rem;
}
</style>
